import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getMessages, markMessageRead } from '../../api/index.js';

function MessageInbox() {
  const { token } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'UNREAD' | 'READ'
  const [markingId, setMarkingId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMessages(token);
      setMessages(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch contact inquiries.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleMarkAsRead = async (id) => {
    setMarkingId(id);
    try {
      await markMessageRead(id, token);
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, read: true } : m))
      );
      setFeedback('Message marked as read.');
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update message status.');
    } finally {
      setMarkingId(null);
    }
  };

  const filteredMessages = useMemo(() => {
    if (filter === 'UNREAD') return messages.filter((m) => !m.read);
    if (filter === 'READ') return messages.filter((m) => m.read);
    return messages;
  }, [messages, filter]);

  const unreadCount = useMemo(() => {
    return messages.filter((m) => !m.read).length;
  }, [messages]);

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">Contact Inquiries Inbox</h2>
            {unreadCount > 0 && (
              <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                {unreadCount} unread
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-400">
            Messages submitted via the public Contact form stored in MongoDB.
          </p>
        </div>

        <div className="flex items-center gap-2 border border-neutral-800 bg-neutral-950/80 rounded-lg p-1 text-xs">
          <button
            onClick={() => setFilter('ALL')}
            className={`rounded px-3 py-1 font-medium transition-colors ${
              filter === 'ALL' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter('UNREAD')}
            className={`rounded px-3 py-1 font-medium transition-colors ${
              filter === 'UNREAD' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('READ')}
            className={`rounded px-3 py-1 font-medium transition-colors ${
              filter === 'READ' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Read ({messages.length - unreadCount})
          </button>
        </div>
      </div>

      {/* Global feedback messages */}
      {feedback && (
        <div className="rounded-lg border border-emerald-800/60 bg-emerald-950/30 p-3 text-xs text-emerald-300">
          {feedback}
        </div>
      )}
      {error && (
        <div className="rounded-lg border border-red-800/60 bg-red-950/30 p-3 text-xs text-red-300">
          {error}
        </div>
      )}

      {/* Messages Loading */}
      {loading && (
        <div className="py-8 text-center text-xs font-mono text-neutral-500">
          Loading contact messages...
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredMessages.length === 0 && (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/20 p-12 text-center text-xs text-neutral-500">
          {filter === 'UNREAD'
            ? 'No unread messages. All caught up!'
            : 'No contact inquiries submitted yet.'}
        </div>
      )}

      {/* Message List */}
      {!loading && filteredMessages.length > 0 && (
        <div className="space-y-4">
          {filteredMessages.map((msg) => (
            <div
              key={msg._id}
              className={`rounded-xl border p-5 transition-all ${
                msg.read
                  ? 'border-neutral-800/80 bg-neutral-900/20 opacity-80 hover:opacity-100'
                  : 'border-neutral-700 bg-neutral-900/60 shadow-lg'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/60 pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      msg.read ? 'bg-neutral-600' : 'bg-emerald-400 animate-pulse'
                    }`}
                  />
                  <div>
                    <span className="font-bold text-white text-sm">{msg.name}</span>
                    <span className="text-neutral-400 text-xs ml-2">&lt;{msg.email}&gt;</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-mono text-neutral-500 text-[11px]">
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleString(undefined, {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })
                      : 'Unknown Date'}
                  </span>
                  {!msg.read && (
                    <button
                      onClick={() => handleMarkAsRead(msg._id)}
                      disabled={markingId === msg._id}
                      className="rounded border border-neutral-700 bg-neutral-800 px-2.5 py-1 text-[11px] font-medium text-neutral-200 hover:bg-neutral-700 hover:text-white transition-colors disabled:opacity-50"
                    >
                      {markingId === msg._id ? 'Updating...' : 'Mark as Read'}
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MessageInbox;

pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source repository...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing client and server dependencies using npm ci...'
                dir('client') {
                    script {
                        if (isUnix()) {
                            sh 'npm ci'
                        } else {
                            bat 'npm ci'
                        }
                    }
                }
                dir('server') {
                    script {
                        if (isUnix()) {
                            sh 'npm ci'
                        } else {
                            bat 'npm ci'
                        }
                    }
                }
            }
        }

        stage('Lint') {
            steps {
                echo 'Executing ESLint on client and server codebases...'
                dir('client') {
                    script {
                        if (isUnix()) {
                            sh 'npm run lint'
                        } else {
                            bat 'npm run lint'
                        }
                    }
                }
                dir('server') {
                    script {
                        if (isUnix()) {
                            sh 'npm run lint'
                        } else {
                            bat 'npm run lint'
                        }
                    }
                }
            }
        }

        stage('Build Client') {
            steps {
                echo 'Building React/Vite production distribution...'
                dir('client') {
                    script {
                        if (isUnix()) {
                            sh 'npm run build'
                        } else {
                            bat 'npm run build'
                        }
                    }
                }
            }
        }

        stage('Server Syntax Check') {
            steps {
                echo 'Verifying Express server syntax and module structure...'
                dir('server') {
                    script {
                        if (isUnix()) {
                            sh 'npm run check'
                        } else {
                            bat 'npm run check'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Continuous Integration run completed.'
        }
        success {
            echo '===================================================='
            echo '✅ CI PIPELINE PASSED: Checkout, Install, Lint, Build & Syntax Check Successful.'
            echo '===================================================='
        }
        failure {
            echo '===================================================='
            echo '❌ CI PIPELINE FAILED: One or more stages encountered errors.'
            echo '===================================================='
        }
    }
}

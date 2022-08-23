pipeline {
    agent any
    tools { nodejs 'node' }
    stages {
        stage('Build') {
            steps {
                // Get some code from a GitHub repository
                git url: 'https://github.com/clementtoledano/nestjs-api.git', branch: 'dev'
            // Change file permisson
            // sh 'chmod +x -R ./scripts'
            // Run shell script
            // sh './scripts/primo.sh'
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'npm install --force'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}

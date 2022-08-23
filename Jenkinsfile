pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                // Get some code from a GitHub repository
                git url: 'https://github.com/clementtoledano/nestjs-api.git', branch: 'dev'
                // Change file permisson
                // sh "chmod +x -R ./jenkins"
                // Run shell script
                sh 'npm install'
                sh 'npm run test'
            }
        }
    }
}

pipeline {
    agent any
    tools { nodejs 'node' }
    stages {
        stage('Build') {
            steps {
                // Get some code from a GitHub repository
                git url: 'https://github.com/clementtoledano/nestjs-api.git',
                branch: dev
                //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
            // Change file permisson
            // sh 'chmod +x -R ./scripts'
            // Run shell script
            // sh './scripts/primo.sh'
            }
        }
        stage('Install dependencies') {
            steps {
                bat 'npm install --force'
            }
        }

        // stage('Test') {
        //     steps {
        //         bat 'npm test'
        //     }
        // }

        stage('toProd') {
            steps {
                script {
                    if ('SUCCESS' != currentBuild.getPreviousBuild().getResult()) {
                        bat 'git status'
                        // bat 'git checkout master'
                        // bat 'git pull'
                        // bat 'git merge dev'
                        // bat 'git push origin dev'
                    }
                }
            }
        }
    }
}

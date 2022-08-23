pipeline {
    agent any
    tools { nodejs 'node' }
    stages {
        stage('Build') {
            steps {
                // Get some code from a GitHub repository
                git url: 'https://github.com/clementtoledano/nestjs-api.git',
                // credentialsId: 'jenkins_ssh_key',
                branch: dev
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

        stage('Test') {
            steps {
                bat 'git fetch --all'
                bat 'git checkout master'
            }
            steps {
                bat 'git pull'
            }
            steps {
                bat 'git merge dev'
            }
            steps {
                bat 'git push origin dev'
            }
        }

        // stage('Test') {
        //     steps {
        //         bat 'npm test'
        //     }
        // }

    // stage('toProd') {
    //     steps {
    //         script {
    //             if ('SUCCESS' != currentBuild.getPreviousBuild().getResult()) {
    //                 bat git checkout master
    //                 bat git pull
    //                 bat git merge dev
    //                 bat git push origin dev
    //             }
    //         }
    //     }
    // }
    }
}

pipeline {
    agent any
    tools {
        nodejs 'default-nodejs'
    }
    stages {
        stage('Build') {
            steps {
                // Get some code from a GitHub repository
                git url: 'https://github.com/clementtoledano/nestjs-api.git', branch: 'dev'
                // Change file permisson
                sh 'chmod +x -R ./scripts'
                // Run shell script
                sh './scripts/primo.sh'
            }
        // steps {
        //     checkout([$class: 'GitSCM',
        //     branches: [[name: '*/main']],
        //     doGenerateSubmoduleConfigurations: false,
        //     extensions: [[$class: 'CleanCheckout']],
        //     submoduleCfg: [],
        //     userRemoteConfigs: [[url: 'https://github.com/clementtoledano/nestjs-api.git']]])
        //     sh 'git merge origin dev'
        // }
        }
    }
}

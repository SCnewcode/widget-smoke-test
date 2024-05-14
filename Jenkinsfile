pipeline {
    agent any
    tools {nodejs "testnodejs"}
    stages {
        stage('Build') { 
            steps {
               
                sh 'npm run cypress-test' 
            }
        }
    }
}
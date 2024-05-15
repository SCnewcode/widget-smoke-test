pipeline {
    agent any
     tools {nodejs "testnodejs"}


   environment {
       CHROME_BIN = '/bin/google-chrome'
      
   }
    stages {
        stage('Dependacy Install') {
            steps {
                sh 'npm install cypress'
            }
        }
        stage('Running Test Script') {
            steps {
                sh 'npm run cypress-test'
            }
        }
    }   
}
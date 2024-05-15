pipeline {
    agent any
     tools {nodejs "testnodejs"}


   environment {
       CHROME_BIN = '/bin/google-chrome'
      
   }
    stages {
        stage('Dependacy Install') {
            steps {
                bat 'npm install cypress'
            }
        }
        stage('Running Test Script') {
            steps {
            bat 'npm run cypress-test'
            }
        }
    }   
}
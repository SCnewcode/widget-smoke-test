pipeline {
    agent any
    tools {nodejs "node"}
    stages {
        stage('Build') { 
            steps {
               
                sh 'npx cypress run --spec cypress/e2e/widget-floy-tests/test.widget.cy.js --config-file cypress.test.config.js --env environment=development' 
            }
        }
    }
}
pipeline {
  agent any
    stages {
      stage('Build') {
        steps {
          script {  
            if(env.BRANCH_NAME == 'master'){
              sh '/home/ec2-user/deploy-scripts/angular.sh'
            }
            else {
              echo 'Only building available in Master Branch'
            }
          }
        }

      }
    }
  
}
pipeline {
  agent any
    stages {
      stage('Build') {
        steps {
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
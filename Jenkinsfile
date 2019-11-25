pipeline {
  agent any

  }
    if(env.BRANCH_NAME == 'master'){
      stages {
        stage('Build') {
          steps {
          sh '/home/ec2-user/deploy-scripts/angular.sh'
          }
        }

      }
    }
  
}
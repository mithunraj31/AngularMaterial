pipeline {
  agent {
    node {
      label 'master'
    }

  }
  stages {
    stage('Git Pull') {
      steps {
        sh '/home/ec2-user/deploy-scripts/angular.sh'
      }
    }

  }
}
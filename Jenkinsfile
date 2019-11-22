pipeline {
  agent {
    node {
      label 'master'
    }

  }
  stages {
    stage('Git Pull') {
      steps {
        sh 'npm install'
        sh 'ls'
      }
    }

  }
}
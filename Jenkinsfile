pipeline {
  agent {
    node {
      label 'a'
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
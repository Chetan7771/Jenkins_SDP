pipeline {
  agent any

  tools {
    maven 'Maven3'   // name from Jenkins Global Tool Config
    nodejs 'Node16'  // name from Jenkins NodeJS plugin config
    jdk 'JDK17'      // name from Jenkins JDK config
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Backend') {
      steps {
        dir('SampleBackend') {
          // Linux:
          sh 'mvn -B clean package -DskipTests'
          // Windows (use on Windows agent):
          // bat 'mvn -B clean package -DskipTests'
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir('SampleFrontend') {
          // Linux:
          sh 'npm ci'
          sh 'npm run build'
          // Windows:
          // bat 'npm ci'
          // bat 'npm run build'
        }
      }
    }

    stage('Archive Artifacts') {
      steps {
        archiveArtifacts artifacts: 'SampleBackend/target/*.jar', fingerprint: true
        archiveArtifacts artifacts: 'SampleFrontend/build/**', allowEmptyArchive: true
      }
    }

    stage('Deploy (example)') {
      steps {
        // Example: scp files to remote server — configure credentials in Jenkins
        // adjust to your server/paths
        sh '''
          scp SampleBackend/target/*.jar user@server:/opt/apps/
          ssh user@server "nohup java -jar /opt/apps/your-app.jar > /opt/apps/app.log 2>&1 &"
        '''
      }
    }
  }

  post {
    success { echo "✅ Pipeline finished" }
    failure { echo "❌ Pipeline failed" }
  }
}

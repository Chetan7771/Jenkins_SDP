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
                    // Windows:
                    bat 'mvn -B clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('SampleFrontend') {
                    // Windows:
                    bat 'npm ci'
                    bat 'npm run build'
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
                // Example for Windows: using pscp and plink from PuTTY (install in PATH)
                bat '''
                pscp SampleBackend\\target\\*.jar user@server:/opt/apps/
                plink user@server "nohup java -jar /opt/apps/your-app.jar > /opt/apps/app.log 2>&1 &"
                '''
            }
        }
    }

    post {
        success { echo "✅ Pipeline finished" }
        failure { echo "❌ Pipeline failed" }
    }
}

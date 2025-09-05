pipeline {
    agent any

    tools {
        maven 'MAVEN'
        jdk 'JAVA'
        // nodejs line removed
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Build Backend') {
            steps {
                dir('SampleBackend') { bat 'mvn -B clean package -DskipTests' }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('SampleFrontend/BooksLibrary') {
                    bat 'npm ci'
                    bat 'npm run build'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'SampleBackend/target/*.jar', fingerprint: true
                archiveArtifacts artifacts: 'SampleFrontend/BooksLibrary/build/**', allowEmptyArchive: true
            }
        }

        stage('Deploy (example)') {
            steps {
                bat '''
                pscp SampleBackend\\target\\*.jar user@server:/opt/apps/
                plink user@server "nohup java -jar /opt/apps/your-app.jar > /opt/apps/app.log 2>&1 &"
                '''
            }
        }
    }

    post {
        success { echo "✅ Pipeline finished successfully" }
        failure { echo "❌ Pipeline failed" }
    }
}

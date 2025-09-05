pipeline {
    agent any

    tools {
        maven 'Maven3'   // Jenkins Global Tool Config name
        nodejs 'Node16'  // Jenkins NodeJS plugin config name
        jdk 'JDK17'      // Jenkins JDK config name
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
                    // Windows: build backend
                    bat 'mvn -B clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('SampleFrontend/BooksLibrary') {
                    // Windows: build frontend
                    bat 'npm ci'
                    bat 'npm run build'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                // Archive backend JAR
                archiveArtifacts artifacts: 'SampleBackend/target/*.jar', fingerprint: true
                // Archive frontend build folder
                archiveArtifacts artifacts: 'SampleFrontend/BooksLibrary/build/**', allowEmptyArchive: true
            }
        }

        stage('Deploy (example)') {
            steps {
                // Example: Windows → Linux deploy using PuTTY tools
                // Make sure pscp.exe and plink.exe are in PATH
                bat '''
                REM Copy backend JAR to Linux server
                pscp SampleBackend\\target\\*.jar user@server:/opt/apps/

                REM Run backend on Linux server
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

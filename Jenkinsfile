pipeline {
    agent any

    tools {
        maven 'MAVEN'   // Must match Jenkins Global Tool Config
        jdk 'JAVA'      // Must match Jenkins JDK config
        // NodeJS removed from tools; will use Windows PATH
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('SampleBackend/bookslibrary') { 
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
                archiveArtifacts artifacts: 'SampleBackend/bookslibrary/target/*.jar', fingerprint: true
                // Archive frontend build folder
                archiveArtifacts artifacts: 'SampleFrontend/BooksLibrary/build/**', allowEmptyArchive: true
            }
        }

        stage('Deploy (example)') {
    steps {
        bat '''
        REM Copy backend JAR to Linux server
        scp SampleBackend\\bookslibrary\\target\\*.jar user@server:/opt/apps/

        REM Run backend on Linux server
        ssh user@server "nohup java -jar /opt/apps/your-app.jar > /opt/apps/app.log 2>&1 &"
        '''
    }
}

    }

    post {
        success { echo "✅ Pipeline finished successfully" }
        failure { echo "❌ Pipeline failed" }
    }
}

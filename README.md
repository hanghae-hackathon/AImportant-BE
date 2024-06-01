# 발표자료
[15팀_항해 해커톤 발표자료_0601_최종.pdf](https://github.com/user-attachments/files/15520558/15._._0601_.pdf)



# AImportant

AImportant는 AI 분석을 통해 수능 영어 문제와 고등학교 모의고사 영어 문제를 풀고 분석하며, 추천까지 제공하는 Next.js 프로젝트입니다.

## 목차

- [프로젝트 개요](#프로젝트-개요)
- [주요 기능](#주요-기능)
- [사용 기술](#사용-기술)
- [API 엔드포인트](#API-엔드포인트)

## 프로젝트 개요

AImportant는 AI를 활용하여 수능 영어 문제와 고등학교 모의고사 영어 문제를 자동으로 풀고, 상세한 분석과 개인 맞춤형 추천을 제공함으로써 학생들의 영어 실력을 향상시키는 것을 목표로 합니다.

## 주요 기능

- **AI 기반 문제 해결:** 수능 영어 문제와 고등학교 모의고사 영어 문제를 자동으로 풀이합니다.
- **상세 분석:** 각 문제에 대한 심층 분석을 제공하여 학생들이 문제를 이해하도록 돕습니다.
- **개인 맞춤형 추천:** 개별 성과를 바탕으로 내 능력치 산출, 내 이전 데이터와 비교 분석, 학생 평균과 분석을 해주며 약한 유형을 보강하는 맞춤형 추천 모의고사 문제를 제공합니다.
- **PDF 업로드 분석:** PDF를 업로드하여 AI가 문제를 분석/풀이하여 사용자에게 제공해줍니다.

## 사용 기술


- **Nest.js:** 백엔드 서버를 구축하는 데 사용된 프레임워크입니다. Nest.js는 TypeScript로 작성되어 있으며, 모듈 기반 아키텍처와 의존성 주입을 지원하여 깔끔한 코드 구조를 제공합니다.
- **Prisma:** 데이터베이스 ORM(Object-Relational Mapping) 도구로, TypeScript와 JavaScript에서 사용할 수 있습니다. Prisma는 데이터베이스 스키마를 정의하고, CRUD(Create, Read, Update, Delete) 작업을 쉽게 수행할 수 있도록 도와줍니다.
- **MySQL:** 데이터베이스로, Prisma를 통해 액세스됩니다. MySQL은 관계형 데이터베이스 관리 시스템(RDBMS) 중 하나로, 구조화된 데이터를 저장하고 관리하는 데 사용됩니다.
- **AWS Lightsail:** 클라우드 호스팅 서비스로, Nest.js 애플리케이션을 배포하기 위해 사용됩니다. AWS Lightsail은 쉽고 간편한 클라우드 서버 배포를 제공합니다.
- **Docker:** 컨테이너 기반 가상화 플랫폼으로, 애플리케이션의 환경을 컨테이너로 패키징하여 배포하고 실행할 수 있습니다.

## API 엔드포인트

  ### User
  - **Post /user :** 유저 생성 
  - **Post /user/login :** 로그인
  ### Question
  - **Post /qustion :** 문제 1개 생성 
  - **Post /qustion/many :** 여러 문제 생성
  - **Get /qustion/random :** 랜덤 문제 받기
  - **Get /qustion/:id :** id로 문제 받기
  - **Patch /qustion/:id :** 문제 수정
  ### History
  - **Post /history/:id :** 유저 히스토리 생성
  - **Get /history :** 유저 히스토리 받기

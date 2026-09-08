# Project Compass

📄 Product Requirement Document (PRD)

🏛 Project: DIFC – Digital Infrastructure & Fund Control System

1. 📌 Product Overview

1.1 Purpose

The DIFC system is a secure, scalable, and audit-compliant platform designed to manage government infrastructure projects, budgets, and progress tracking.

It enables:

Centralized project monitoring

Real-time progress updates

Transparent audit trails

Role-based data access

Bulk data ingestion via Excel

1.2 Goals

Improve transparency in public project execution

Enable data-driven decision making

Ensure audit compliance

Provide real-time dashboards

Reduce manual errors via automation

1.3 Success Metrics (KPIs)

% of projects updated weekly

Reduction in manual data errors

Dashboard usage frequency

Bulk upload success rate

System uptime (≥ 99.5%)

2. 👥 Users & Roles

2.1 User Types

RoleDescriptionSuperAdminFull system controlAdminManage users, departmentsDepartmentHeadOversee department projectsProjectManagerManage assigned projectsDataEntryOperatorUpload/update dataViewerRead-only access

2.2 Key Permissions

Role-based access (RBAC)

Field-level restrictions (future scope)

Audit tracking for all actions

3. 🧩 Core Features

3.1 🔐 Authentication & Security

Features

JWT-based authentication

Refresh token mechanism

ASP.NET Identity integration

Role-based authorization

Security Requirements

Strong password policy

Account lockout after failed attempts

HTTPS enforced

Audit logs for all actions

IP tracking

Soft delete for data recovery

3.2 👤 User Management Module

Functional Requirements

Create / update users

Assign roles

Activate / deactivate users

Reset password

Lock/unlock accounts

Non-Functional

All actions must be logged

Only Admin/SuperAdmin can manage users

3.3 📁 Project Management Module

Features

Create and manage projects

Track:

Budget allocation vs spending

Physical progress

Financial progress

Filter by:

Department

State

Status

Key Rule

❗ No direct overwrite of progress → must go through ProjectUpdate

3.4 📊 Project Progress Tracking

Features

Add periodic updates

Maintain historical records

View full audit trail

Benefits

Transparency

Historical analytics

Fraud prevention

3.5 📤 Excel Bulk Upload

Features

Upload Excel file

Validate structure and data

Row-level error reporting

Transaction-based save

Rules

Reject invalid files

Partial success not allowed (atomic operation)

Logging

Uploaded by

Timestamp

Records processed

Errors count

3.6 📊 Dashboard & Analytics

KPIs

Total projects

Active / Completed / Delayed

Budget utilization %

Avg progress

Charts

Projects by department

Projects by state

Monthly trends

Budget vs spending

Performance

Optimized queries (read-heavy)

Optional Dapper support (future)

3.7 📂 File Management

Features

Upload attachments

Retrieve files

Delete files

Design

Abstract storage service

Local storage initially

Cloud-ready (Azure Blob later)

3.8 🧾 Audit Logging System

Mandatory Tracking

Entity changes

Old vs new values

User performing action

Timestamp

IP address

Compliance

Government-grade traceability

4. 🧱 System Architecture

4.1 High-Level Architecture

Client (Web / Mobile)

API Layer (ASP.NET Core)

Application Layer (Business logic)

Infrastructure Layer (EF Core, Identity, Storage)

Database (PostgreSQL)

4.2 Backend Stack

ASP.NET Core Web API

EF Core

PostgreSQL

ASP.NET Identity

Serilog

FluentValidation

4.3 Frontend Architecture (Recommended)

Web App

React (preferred) or ASP.NET MVC

Structure

Pages

Components

Services (API calls)

State Management (Redux / Context API)

Features

Role-based UI rendering

Token-based auth handling

Dashboard visualizations

File upload UI

4.4 Mobile Readiness

REST APIs

JWT authentication

No backend changes required

5. 🗄 Database Design

Core Tables

Users

Roles

Projects

ProjectUpdates

Departments

RefreshTokens

AuditLogs

FileAttachments

Key Constraints

ProjectCode must be unique

Soft delete for critical entities

Foreign key relationships enforced

6. 🔌 API Design

Authentication

POST /auth/login

POST /auth/refresh

POST /auth/logout

Users

GET /users

POST /users

PUT /users/{id}

Projects

GET /projects

GET /projects/{id}

POST /projects

PUT /projects/{id}

DELETE /projects/{id}

Progress

POST /projects/{id}/update-progress

GET /projects/{id}/history

Excel

POST /projects/bulk-upload

Dashboard

GET /dashboard/summary

7. 📜 Logging & Monitoring

Logging (Serilog)

Track:

Login attempts

Data changes

Errors

Unauthorized access

Output

File logs

Console logs

Optional DB logs

8. 📏 Validation

Centralized validation using FluentValidation

DTO-based validation

Clear error messages

9. 🚀 Deployment

Initial Setup

Linux VM

Nginx reverse proxy

ASP.NET Core API

PostgreSQL

Local storage

Future Enhancements

Docker

Load balancer

Redis caching

10. 💰 Cost Strategy

Open-source stack

Minimal cloud dependency

Scale only when needed

11. ⚠ Risks & Mitigations

RiskMitigationData inconsistencyUse transactionsUnauthorized accessStrong RBAC + JWTData lossRegular backupsPerformance issuesOptimize queries, caching (future)

12. 🔮 Future Scope

Notification system (Email/SMS)

GIS-based project tracking

AI-based delay prediction

Advanced reporting exports

Role-based dashboards

Multi-language support

13. ✅ Final Summary

DIFC is a:

Secure 🔐

Scalable 📈

Audit-compliant 📜

Mobile-ready 📱

Cost-efficient 💰

enterprise-grade government project management platform.

If you want next, I can also create:
✅ UI/UX wireframes
✅ Database ER diagram
✅ API Swagger spec
✅ Frontend folder structure (React)
✅ Dev sprint plan (Agile roadmap)

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/091bfbd9-18aa-4afb-91f2-de6a0e97be19).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

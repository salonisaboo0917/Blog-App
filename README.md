# Blog API - Node.js Backend

This project provides a RESTful API for managing blogs, categories, and user authentication. It uses **Node.js**, **Express**, **MySQL** (via XAMPP), and other useful libraries like **Joi** for validation, **Multer** for file uploads, and **Nodemailer** for sending emails.

## Features

- **User Authentication**: Register, Login, and change passwords.
- **Blog Management**: Create, read, update, and delete blogs (soft delete).
- **Category Management**: Manage blog categories.
- **Role-Based Access**: Admin and User roles, with admin-level permissions to manage all blogs and users.
- **Slug-based Access**: Blogs are accessible by their **slug** instead of ID.
- **Email Notifications**: Password reset via email using Nodemailer.

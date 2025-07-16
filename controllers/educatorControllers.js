    import {clerkClient} from '@clerk/express'

import {v2 as cloudinary} from 'cloudinary'
import Course from '../models/course.js2'
import { Purchase } from '../models/Purchase'

export const updateRoleToEducator = async (req, res)=>{
    try{
        const userId= req.auth.userId

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetaData:{
                role: 'educator',

            }
        })
        res.JSON({ success:true, message: 'you can publish course now'})

    }catch(error){
        res.JSON({ success:false, message: error.message})
    }
}

//Add new course

export const addCourse = async (req,res)=>{
    try {
        const { courseData } = req.body
        const imageFile = req.imageFile
        const educatorId = req.auth.userId

        if(!imageFile){
            return res.json({success:false, message: 'Thumbnail Not Attached' })
        }

        const parsedCourseData = await JSON.parse(courseData)
        parsedCourseData.educator = educatorId
        const newCourse = await Course.create(parsedCourseData)
        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        newCourse.courseThumbnail = imageUpload.secure_url
        await newCourse.save()

        res.json({ success: true, message: 'Course Added'})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get Educator Courses

export const getEducatorCourses = async (req, res)=>{
    try {
        const educator = req.auth.userId

        const courses = await Course.find({educator})
        res.json({ success: true, courses })
    } catch (error) {
         res.json({ success: false, message: error.message })
    }
}

//Get Educator DashBoard Data ( Total Earnings, Enrolled Students, No.of courses)

export const educatorDashBoardData = async (req,res)=>{
    try {
        const educator = req.auth.userId
        const courses = await Course.find({educator})
        const totalCourses = courses.length;

        const courseIds = courses.map(course => course._id);
        //calculate total earning from purchases

        const purchases = await Purchase.find({
            courseId: {$in: courseIds},
            status: 'completed'
        })
        const totalEarnings = purchases.reduce((sum, purchases)=> sum + purchases.amount, 0)

        // collect unique enrolled student IDs with their course titles
        const enrolledStudentsData = [];
        for(const course of courses){
            const students = await User.find({
                _id: {$in: course.enrolledStudents}
            }, 'name imageUrl')
            students.forEach(student => {
                enrolledStudentsData.push({
                    courseTitle: course.courseTitle,
                    student
                })
            });
        }
        res.json({success: true, dashboardData: {
            totalEarnings, enrolledStudentsData, totalCourses
        }})

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Get Enrolled Students Data with Purchase Data
export const getEnrolledStudentsData = async (req,res)=>{
    try {
        const educator = req.auth.userId;
        const courses = await Course.find({educator});
        const courseIds = courses.map(course => course._id);

        const purchases = await Purchase.find({
            courseId: {$in: courseIds},
            status: 'completed'
        }).populate('userId', 'name imageUrl').populate('courseId', 'courseTitle')

        const enrolledStudents = purchases.map(purchase =>({
            student: purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseDate: purchase.createdAt
        }));

        res.json({success:true, enrolledStudents})

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
import express from 'express'
import { addUserRating, getUserCourseProgress, getUserDaata, purchaseCourse, updateUserCourseProgress, userEnrolledCourses } from '../controllers/userController'

const userRouter = express.Router()

userRouter.get('/data', getUserDaata)
userRouter.get('/enrolled-courses', userEnrolledCourses)
userRouter.post('/purchase', purchaseCourse)

userRouter.post('/update-course-progress', updateUserCourseProgress)
userRouter.post('/get-course-progress', getUserCourseProgress)
userRouter.post('/add-rating', addUserRating)


export default userRouter;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import SplashScreen from './SplashScreen';  
import LoginScreen from './SignupScreen';
import SignupScreen from './SignupScreen';
import AdminDashboard from './AdminDasboard';
import UserDashboard from './UserDashboard';
import AddBookScreen from './AddBookScreen';
import ViewBook from './ViewBookScreen';
import IssueBookScreen from './IssueBookScreen';
import ReturnBookScreen from './ReturnBook';
import DigitalArchiveScreen from './Digitalarchive';
import EditBookScreen from './EditDigitalarchiveScreen';
import TeacherDashboard from './TeacherDashboard';
import AssignTOC from './AssignToc';
import ViewToc  from './ViewToc'
import AddPersonalBook from './AddPersonalBook'
import ViewPersonalBook from './ViewPersonalBook';
import BookDetails from './BookDetails';
import IssueBook from './IssueBook';
import QRCodeScreen from './QRcodeScreen';




// config.js
export const ipaddress = '192.168.100.90';
export const BASE_URL = `http://${ipaddress}/FinalYearProject1/api/FYP`;
export const BASE_STATIC = `http://${ipaddress}/FinalYearProject1`;         // For static files (images, ebooks, etc.)


export const API = {
  LOGIN_USER: `${BASE_URL}/loginUser`,
  ADD_USER: `${BASE_URL}/adduser`,
  ADD_PersonalBOOK: `${BASE_URL}/AddBook`,
  ADD_PIMAGE:`${BASE_URL}/addImage`,
  VIEW_BOOKS: `${BASE_URL}/ViewBooks`,
  ADD_BOOKS:`${BASE_URL}/AddBook`,
  ADD_IMAGE:`${BASE_URL}/addImage`,
  Get_PBOOKS:`${BASE_URL}/GetBooks`,
  ADD_PDF:`${BASE_URL}/UploadPdf`,
  SAVE_QRCODE:`${BASE_URL}/SaveQRCode`,
  Get_Student:`${BASE_URL}/GetStudents`,
  Get_TableOfContents:`${BASE_URL}/GetTOC`,
  Assign_TOC:`${BASE_URL}/AssignTOC`,
  Get_User_By_ID:`${BASE_URL}/GetUserName`,

};

export const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null;

  if (imagePath.startsWith('http')) {
    return imagePath;
  } else if (imagePath.startsWith('/Images')) {
    return `${BASE_STATIC}${imagePath}`;
  } else {
    return `${BASE_STATIC}/Images/${imagePath}`;
  }
};



const Stack = createStackNavigator();


const ApplyNav = () => {



  return (
     <NavigationContainer>
               <Stack.Navigator screenOptions={{ headerShown: false }}>
              
                   <Stack.Screen name="SplashScreen" component={SplashScreen} />
                   <Stack.Screen name="LoginScreen" component={LoginScreen} />
                   <Stack.Screen name="SignupScreen" component={SignupScreen}/>
                   <Stack.Screen name="AdminDashboard" component={AdminDashboard}/>
                   <Stack.Screen name="UserDashboard" component={UserDashboard}/>
                   <Stack.Screen name="BookDetails" component={BookDetails}/>
                   <Stack.Screen name="IssueBook" component={IssueBook}/>

                   <Stack.Screen name="TeacherDashboard" component={TeacherDashboard}/>
                   <Stack.Screen name="AddPersonalBook" component={AddPersonalBook}/>
                   <Stack.Screen name="ViewPersonalBook" component={ViewPersonalBook} /> 
                   <Stack.Screen name="AssignTOC" component={AssignTOC}/>
                   <Stack.Screen name="ViewToc" component={ViewToc}/>
                   <Stack.Screen name="AddBookScreen" component={AddBookScreen}/>
                   <Stack.Screen name="ViewBook" component={ViewBook}/>
                   <Stack.Screen name="IssueBookScreen" component={IssueBookScreen}/>
                   <Stack.Screen name="ReturnBookScreen" component={ReturnBookScreen}/>
                   <Stack.Screen name="DigitalArchiveScreen" component={DigitalArchiveScreen}/>
                   <Stack.Screen name="EditBookScreen" component={EditBookScreen}/>
                   <Stack.Screen name="QRCodeScreen" component={QRCodeScreen}/>
                 
                
                  

                                 {/* Admin dashboard menu  */}
                 

                   

               </Stack.Navigator>
           </NavigationContainer>
  );
};

export default ApplyNav;

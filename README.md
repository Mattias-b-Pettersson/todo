![Home page](/readme-images/home-page.png)

# TODO

Todo is a todo app that is aimed at companies or groups. With this app one is able to assign todo tasks to another and also leave comments on it

# Features

## Sign in and Sign up page
The user is able to create an account at the sign up page and choose a username and password
The user is able to sign in at the sign in page. The 2 has the same layout, only diffrent form fields and diffrent text.

![Sign up page](/readme-images/signup.png)

## Todos

Here the user is able to se the todos that is either assigned to him/her or created by him/her.

- The user is able to sort todos by status, priorty 

- The user is able to order by status or priority.

- The user is also able to search for todos.

- In a todo object the following information is displayed:
  - Title
  - Status
  - Priority
  - Due date
  - Description
  - Assigned
  - If there is an attached file, this is displayed. If not, no field for it is displayed.
  - Created by.
  - Last updated.

![Todos](/readme-images/todos.png)

- If a user is signed in and is a owner or assigned to the object the user is able to edit it or delete it.

- If a user is clicking on the title the user is taken to that todos specific page. 
- Here the user is able to make comments/notes.

![Todo](/readme-images/todo.png)

### Todo creation and edit page.

At the creation page the user is able to create todos.

![Create todo](/readme-images/new-todo.png)

Here the user is able to create a todo with the requiered fields:
    - Title
    - Content
    - Priority
    - Status
    - Due date
    - File
    - Assigned

The edit page has the same layout and fields, only diffrent text to match an edit form. 

## Profile page

- The customer can find both phone number and email adress.

- The customer can take part of a map that show exactly where the restaurant is located.

![Profile page](readme-images/profile.png)

At the profile pages a user can read more about other users and change their own profile.

# Testing

- I have tested the application on mobile and also in diffrent browsers to make sure everything is displayed correctly and that every button works as expected.

- I have also made some automated tests, it tests the navbar and profile page.


## Solved Bugs

When deploying the application to heroku there were multiple bugs that arose.

Almost all of them were made by me that was typos.

There was some bugs that arose that i had to solve, but turns out i made wrong model querys.

## Remaining Bugs

- There are no known bugs remaining.

# Validator Testing

The code is ran through ESlinter and no errors occur.

There is one warning that i have chosen to leave. Or else when trying to fix this the page got stuck in an infinte loop, and fired API requests hundreds of times.

"WARNING in [eslint]\
src/pages/todo/TodosPage.js\
  Line 63:8:  React Hook useEffect has a missing dependency: 'searchFields'. Either include it or remove the dependency array. You can also do a functional update 'setSearchFields(s => ...)' if you only need 'searchFields' in the 'setSearchFields' call  react-hooks/exhaustive-deps"¨

# Libraries used
- React bootstrap 
- Infinite scroll - This is used to automaticly fetch new todos as the user has reached/is nearing end of the page.

I was looking out for a datepicker as i had trouble figuring out how to implement the date picker from bootstrap. so i looked in to [this](https://www.npmjs.com/package/react-datepicker) library. But then it struck me, and i figured out how to implement it with bootstrap.

I realise now after the site is almost done that i could have checked for more packages at [npmjs.com](https://www.npmjs.com/)

# Deployment

To deploy the project to heroku, do the following

1. Create a app in heroku.
2. If your site is on Github, in the Heroku app go in to "Deploy" and connect your github account and project.
Lastly scroll down and click on "Deploy Branch" and make sure "main" is selected.

# UX design work

The design were made with simpicity in mind. I designed this wireframes on [creatly](app.creately.com) to have a get a visual on my vision i had in mind.
![Wirefram image](/readme-images/wireframe.png)

# Project Goals
The project goals for this project were to create a todo page for a company so that they can keep tack on what they need to do, where it was also possible to assign the task to someone else. 

# Credits

## Special thanks
- To code institute for the inspiration and help with this project through out the project.
- [MDBbootstrap](mdbootstrap.com), altough it was a diffrent npm package for bootstrap their documentation was super easy to understand and was easy to implement to normal bootstrap package used.
- It was also from [MDBbootstrap](mdbootstrap.com) i got the sign in form base. and i modified it to my liking. 
- [usehooks.com](https://usehooks.com/useWindowSize/) for a good explanation for the windowsize hook that i used to know how i was gonna display the profile dropdown menu.

## Media
- Default profile picture from Code Institute.
- Logo was generated at logo.com
- UI pictures was from Freepik 
    - [404 image](https://www.freepik.com/free-vector/404-error-with-portals-concept-illustration_20824302.htm#query=not%20found&position=13&from_view=search&track=sph)
    - [Please sign in image](https://www.freepik.com/free-vector/mobile-login-concept-illustration_4957136.htm#query=sign%20in&position=0&from_view=search&track=sph)
    - [Sign in image](https://www.freepik.com/free-vector/access-control-system-abstract-concept_12085707.htm#query=login&position=0&from_view=keyword%22%3EImage%20by%20vectorjuice)
- the loading gif is from [loading.io](https://loading.io/)
- Profile picture for Henrik: https://unsplash.com/photos/7YVZYZeITc8
- Profile picture for Maria: https://unsplash.com/photos/rDEOVtE7vOs
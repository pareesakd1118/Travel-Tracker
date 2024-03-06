# <p align="center">TravelTracker</p>

<p align="center">This is a web application which a user must sign into, and upon signing in they are brought to a dashboard which displays the specific user's past trips and pending (trips awaiting travel agent booking/approval), including location, duration of trip and party size. The dashboard also shows the user the total amount they have spent on travels within the past year, and the option to submit a request for a new trip. To do so, the user must fill out a form including destination, duration of trip, start date of trip and total number of travelers. The user will then see an estimated cost of the trip before they choose to submit the booking request to the pending trips dashboard for agent approval.</p>

### <p align="center">Contributors</p>
<div align="center">

 [Pareesa Kamgar-Dayhoff](https://github.com/pareesakd1118)

</div>

### <p align="center">Technologies Used</p>
<div align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=for-the-badge" alt="javascript badge">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=fff&style=for-the-badge" alt="html badge">
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=fff&style=for-the-badge" alt="css badge">
  <img src="https://img.shields.io/badge/Mocha-8D6748?logo=mocha&logoColor=fff&style=for-the-badge" alt="mocha badge">
  <img src="https://img.shields.io/badge/Chai-A30701?logo=chai&logoColor=fff&style=for-the-badge" alt="chai badge">
  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?logo=visualstudiocode&logoColor=fff&style=for-the-badge" alt="vscode badge">
  <img src="https://img.shields.io/badge/Lighthouse-F44B21?logo=lighthouse&logoColor=fff&style=for-the-badge" alt="lighthouse badge">
</div>

## Preview:
<div align="center">



https://github.com/pareesakd1118/Travel-Tracker/assets/150022029/910cff6b-8f0e-41af-8db2-f44e589d765f


</div>

## Installation Instructions:
- clone the local server to your machine
    
    ```
    git clone git@github.com:turingschool-examples/travel-tracker-api.git
    ```
    
- Run `cd travel-tracker-api`
- Run `npm install` to install packages
- Run `npm start` to run the local server
- Navigate to this [link](https://tednaphil.github.io/FitLit/)
- Sign in using a username of traveler + and number 1-50 (no space between 1 and 50) and password of traveler. Each different username will gather that specific user's information
- Type `CTRL + C` in terminal where server is running to stop running the local server when finished browsing the dashboard

## Context:
<!-- wins, challenges, time spent, etc -->
- Ongoing group project begun in the 10th week of the contributor learning JavaScript
- Approximately 20 hours to complete test suite and functionality
- Goals:
  ```
  - Perform data manipulation with prototype methods
  - Create navigable and easy to follow user interface
  - Use SRP code that strives for purity
  - Implement robust testing suite using TDD
  - Retrieve and post data with network requests
  ```
- Wins:
  ```
  - TDD approach taken to writing robust tests, driving code-writing that meets user-story-guided benchmarks
  - Making network requests to multiple datasets, processing data with promise chaining and Promise.all()
  - Working with webpack to execute cross-file imports/exports
  - Use of GitHub project board to organize tasks 
  - Utilizing PR templates to streamline group workflow
  ```
- Challenges:
  ```
  - Troubleshooting and working through initial problems with POST requests
  - API fetch calls, asynchronous function calls, and using Promise.all()
  ```

## Future Improvements:
  ```
  - More testing for DOM-related functions
  - Gain more insight from user testing to implement better UX/UI
  - Refactor some DOM functions to DRY up code, possibly deferring some functionality to other files
  - Update date field to be properly labeled
  - Update refactored select destination options
  - Figure out why Math.round() not working for all calculations
  ```

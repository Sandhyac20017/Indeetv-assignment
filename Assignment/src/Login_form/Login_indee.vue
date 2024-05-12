<template>
  <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
  <div class="main_page">
    <img src="../assets/netflix.jpg" class="bg_image" />
    <div class="login-form">

      <div class="mgm_logo">
        <img src="../assets/MGM.png" class="mgm" />
        <h4>Global <br> Distribution</h4>
      </div>
      <div class="box1">
        <h2>Sign in </h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email"  placeholder="Enter your email address" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <div class="password-wrapper">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your Password"
                required
                @input="showPasswordStrengthMeter"
              >
              <i class="ri-eye-close-line" @click="togglePasswordVisibility"></i>
            </div>
          </div>
          <a href="#" class="forgot-password" @click="showModal = true">
            <h4>Forgot Password?</h4>
          </a>
           <div v-if="showPasswordMeter" class="password-strength-meter">
            <label>Password Strength:</label>
            <div class="power-container">
              <div id="power-point"></div>
            </div>
          </div>
          <div class="reminder">
            <label>
              <input type="checkbox" id="reminderCheckbox"> Keep me signed in for 30 days
            </label>
          </div>
         
          <button type="submit" @click="submitForm">SIGN IN</button>
          <div class="terms-link">
             <h6>Read our Terms of Service</h6>
            <router-link to="/terms" class="terms-link">
     
      <i class="ri-share-box-line" ></i>
    </router-link>
          </div>
        </form>
      </div>

      <div class="footer">
        <div class="services"></div>
        <div class="association">
          <h4>Other ways to watch</h4>
          <div class="img_sec">
            <img src="../assets/Subtract.png" />
            <img src="../assets/Vector.png" />
            <img src="../assets/g2993.png" />
            <img src="../assets/g10.png" />
          </div>
          <h6>Search for AppleTV+ FYC on your App Store</h6>
        </div>
      </div>
    </div>
    </div>


    <div v-if="showModal" class="modal">
  <div class="modal-content">
    <span class="close" @click="showModal = false">&times;</span>
    <h2>Reset Password</h2>
    <div class="form-group">
      <label for="newPassword">New Password:</label>
      <div class="password-wrapper-reset">
        <input  id="newPassword" v-model="newPassword" :type="showNewPassword ? 'text' : 'password'" placeholder="Enter new password" required>
      <i :class="showNewPassword ? 'ri-eye-line icon-black' : 'ri-eye-close-line icon-black'" @click="toggleNewPasswordVisibility"></i>

      </div>
    </div>
    <div class="form-group">
      <label for="confirmPassword">Confirm Password:</label>
      <div class="password-wrapper-reset">
        <input  id="confirmPassword" v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" placeholder="Re-enter new password" required>
       <i :class="showConfirmPassword ? 'ri-eye-line icon-black' : 'ri-eye-close-line icon-black'" @click="toggleConfirmPasswordVisibility"></i>
      </div>
    </div>
    <p class="error-message">{{ errorMessage }}</p>
    <button class="btn-reset" @click="resetPassword">Reset Password</button>
    <div v-if="successMessage" class="success-message">
      <p>{{ successMessage }}</p>
    </div>
  </div>
</div>

</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      showModal: false,
      newPassword: '',
      confirmPassword: '',
      errorMessage: '',
      successMessage: '',
      showNewPassword: false,
    showConfirmPassword: false,
    showPasswordMeter: false,
    
    };
  },
   mounted() {
    const passwordInput = document.getElementById("password");
    passwordInput.addEventListener("input", this.updatePasswordStrength);
  },
  methods: {
    submitForm() {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
     toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  },
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  },
  closeModal() {
  this.showModal = false;
  document.getElementById('success-message').style.display = 'none';
},
 
  
    resetPassword() {
      if (this.newPassword === this.confirmPassword) {
        console.log('New Password:', this.newPassword);
        console.log('Confirm Password:', this.confirmPassword);
        this.showModal = false;
        this.errorMessage = '';
        
        this.successMessage = 'Your password has been successfully reset!';
        document.querySelector('.success-message').classList.add('show');
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
         document.getElementById('success-message').style.display = 'block'; 
      } else {
        this.errorMessage = 'Passwords do not match';
        return;
      }
    },
    
    // Function to calculate password strength and update the visual representation
    updatePasswordStrength() {
      const password = this.password;
       const powerContainer = document.querySelector(".power-container");
      const powerPoint = document.getElementById("power-point");

      const regex = [
        /[A-Z]/, // At least one uppercase letter
        /[a-z]/, // At least one lowercase letter
        /[0-9]/, // At least one digit
        /[!@#$%^&*(),.?":{}|<>]/, // At least one special character
      ];

      let strength = 0;
      regex.forEach((pattern) => {
        if (pattern.test(password)) {
          strength++;
        }
      });

   
        let widthPercentage = 0;
      if (strength >= 3) {
        powerContainer.style.backgroundColor = "green";
            widthPercentage = 100;
      } else if (strength >= 2) {
        powerContainer.style.backgroundColor = "yellow";
            widthPercentage = 60;
      } else if (strength >=1){
        powerContainer.style.backgroundColor = "red";
            widthPercentage = 15;
      }
      powerPoint.style.width = widthPercentage + "%";
    },
     showPasswordStrengthMeter() {
      this.showPasswordMeter = this.password.length > 0;
      this.updatePasswordStrength();
    },
  },
};
</script>


<style >

body {
  margin: 0;
  padding: 0;
}
.main_page{
  width: 100vw; 
  height: 100vh; 

  position:relative;

}
.bg_image{
  width: 100%; 
  height:100%; 
  object-fit: cover; 
  padding: 0;
  margin:0;
  position:absolute;
  position:fixed;
  background: linear-gradient(to right, rgba(45, 39, 39, 0.46) 50%, rgb(0, 0, 0) 50%);

}
.bg_image::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; 
}
.login-form{
width: 390px;
height:650px;
border-radius: 12px;
background-color: rgba(0, 0, 0, 0.736); 
margin-top:-10px;
position:absolute;
top: 50%; 
left: 50%; 
transform: translate(-50%, -50%); 

}
h2{
color: white;
}
.logo{
color:white;
}
.box1{
margin-top:-3%;
padding-left: 30px;
padding-right: 30px;
} 

.mgm_logo {
    display: flex; 
    align-items: center; 
    justify-content: center;
    margin-top:-2%;
    gap:6px;
  }
.mgm_logo img.mgm {
    height: 50px;
    width: 80px;
    margin-top:3.5%;
   
  }
.mgm_logo h4 {
    
    color:white;
    font-family: NotoSans;
    font-size: 20px;
    font-weight: 600;

  }
.form-group {
  margin-bottom: 15px;
  position:relative;
}
.password-wrapper {
  position: relative;
  display:flex;
}
.password-wrapper i {
  position: absolute;
  right: 20px; 
  top: 50%;
  transform: translateY(-50%);
  color: #e1cfcf; 
  cursor: pointer;
  
}

label {
  display: block;
  margin-bottom: 5px;
  color: var(--Type-Heroic-Blue, #1A68FF);
  font-weight:500;
  font-family: NotoSans;
}

input[type="email"],
input[type="password"] {
  width: calc(100% - 10px); 
  padding: 10px;
  font-size: 15px;
  background-color: #191d1a; 
  box-sizing: border-box; 
  border-radius: 4px;
  color: white;
  
}
.password-wrapper input[type="password"] {
  width: calc(100% - 10px); 
  padding-right: 30px; 
  font-size: 15px;
  border-radius: 4px;
  background-color: #191d1a;
  color: white; 
  box-sizing: border-box; 
}

.password-wrapper input[type="text"] {
  width: calc(100% - 10px); 
  padding-right: 30px;
  padding:10px;
  font-size: 15px;
  border-radius: 4px;
  background-color: #191d1a;
  color: white; 
  box-sizing: border-box; 
}
.password-strength-meter {
  text-align: left;
}

.password-strength-meter label {
  display: block;
  margin-bottom: 5px;
  color: #fff;
}

.power-container {
  background-color: #2E424D; 
  width: 100%; 
  height: 15px; 
  border-radius: 5px; 
}

.power-container #power-point {
  width: 1%; 
  height: 100%; 
  border-radius: 5px; 
  transition: 0.5s; 
}
 .forgot-password h4{
  font-size: 15px;
  color:#BCBCBC;
  font-weight:400;
  justify-content: flex-end;
  display: flex;
  margin-top:-6px;
  margin:0px;
  font-family:NotoSans;
  text-decoration: None;

 }
 .reminder {
  display: flex;
  align-items: center;
  margin-Bottom : 1.5rem;
  margin-top:2%;
}

.reminder label {
  margin-left: 5px; 
  font-size: 15px; 
  color:#BCBCBC;
  font-weight: 400;

}

.reminder input[type="checkbox"] {
  appearance: none;
  border: 1px solid #ccc;
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 20px; 
  width: 20px; 
  background-color: #191d1a; 
  border-radius: 3px; 
  cursor: pointer;
  outline: none; 
  color:white;
}

.reminder input[type="checkbox"]::before {
 content: "\2714";
  display: inline-block;
  border-width: 0 2px 2px 0; 
  position: relative;
  top: 2px; 
  left: 2px; 
  visibility: hidden; 
}


.reminder input[type="checkbox"]:checked::before {
  visibility: visible;
}


button {
  width: 100%;
  padding: 4% ;
  font-size: 16px;
  background: var(--Primary-Electric-Blue, #0057FF);
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  color:white;
  letter-spacing:2px;
  margin-top: -2%;
  height:40px;
  
}

button:hover {
  background-color: #0056b3;
  color:white;
}
.terms-link {
display:flex;
  align-items: center;
  font-size: 20px; 
  color:#BCBCBC;
  font-weight: 400;
  gap:3%;
  font:NotoSans;
  margin-Top:-2%;
  text-decoration: None;
}
.terms-link h6 {
  color:#BCBCBC;
  } 
 .footer{
border-radius: 0px 0px 12px 12px;
/* opacity: 0px; */
width:100%;
height:150px;
position: absolute;
bottom: 0;
left: 50%;
transform: translateX(-50%);
} 

.services {
height: 40px;
max-width:100%;
background:#3b3e49fe;
}

.association{
background: var(--Elements-Bunker-Gray, #24272C);
height:110px;
width:100%;
}

.association h4{
text-transform:uppercase;
font-family: Noto Sans;
font-size: 16px;
font-weight: 700;
letter-spacing: 0.14em;
padding:2%;
text-align:center;
color:#D5D5D5;
margin-top: 0px;
}

.img_sec{
width: 80%;
height:18px;
margin:auto;
display:flex;
justify-content: center;
gap:30px;
margin-top:-8px;
}

.association h6{
font-family: Noto Sans;
font-size: 14px;
font-weight: 400;
line-height: 21.79px;
letter-spacing: 0.04em;
text-align: center;
color:#D5D5D5;
margin-top:11px;
}
.modal {
  /* display: none; */
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
    overflow: auto; 
    background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #f1ebeb;
  margin: 12% auto;
  padding: 2%;
  border: 1px solid #888;
  width: 40%;
  color:rgba(3, 3, 3, 0.911);
}
.modal-content h2{
  color:black;
  font-family: Noto Sans;
  font-weight:600;

}
.modal-content input[type="password"],
.modal-content input[type="text"] {
  color: rgb(8, 7, 7);
  background-color: #f1ebeb;
   
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
 
  
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;

  
}
.btn-reset {
  height: 50px;
  width: 200px;
  border-radius: 15px;
  background: var(--Primary-Electric-Blue, #0057FF);
  margin-top: 3%;
  align-items: center; 
  justify-content: center; 
  text-align: center; 
  display: flex; 
  margin:  auto;
  font-size:16px;
}




.error-message {
  color: red; 
  margin-top: 5px; 
}
.success-message {
  position: fixed;
  transform: translateY(-50%);
  animation: slide-in-out 0.5s ease-out forwards; 
   top: 50%;
  left: 50%;
  background-color: #5cb85c; 
  color: white; 
  padding: 15px 20px; 
  border-radius: 5px; 
  display: none; 
}
.success-message.show {
  display: block; 
}
.icon-black {
  color: rgb(0, 0, 0);
}
.password-wrapper-reset {
  position: relative;
  display:flex;
}
.password-wrapper-reset i {
  position: absolute;
  right: 20px; 
  top: 50%;
  transform: translateY(-50%);
  color: #141313; 
  cursor: pointer;
  
}
.password-wrapper-reset input[type="password"] {
  width: calc(100% - 10px); 
  padding-right: 30px; 
  font-size: 15px;
  border-radius: 4px;
  color: rgb(33, 29, 29); 
  box-sizing: border-box; 
}

.password-wrapper-reset input[type="text"] {
  width: calc(100% - 10px); 
  padding-right: 30px;
  padding:10px;
  font-size: 15px;
  border-radius: 4px;
  color: rgb(17, 15, 15); 
  box-sizing: border-box; 
}

@keyframes slide-in-out {
  from {
    left: -100%; 
  }
  to {
    left: 0; 
  }

  50% {
    left: 0;
  }
  
  100% {
    left: -100%;
  }
}
@media only screen and (min-width:320px) and (max-width: 480px) {

.bg_image{
  width: 100vw; 
  min-height:100vh; 
  object-fit: cover; 
  padding: 0;
  margin:0;
  position:absolute;
}
.mgm_logo img.mgm {
    height: 40px;
    width: 60px;
    margin-top:3.5%;
}
  .login-form {
    width: 90%;
    max-width: 400px;
    height:610px;
    max-height: 750px;
  }
  .association {
    width: 100%;
    max-width: 100%;
   
  }
.mgm_logo h4 {
  color:white;
  font-family: NotoSans;
  font-size: 18px;
  font-weight: 600;

}
.footer{
border-radius: 0px 0px 12px 12px;
width:100%;
height:110px;
position: absolute;
bottom: 0;
left: 50%;
transform: translateX(-50%);
} 

.services {
height: 30px;
max-width:100%;
background:#3b3e49fe;
}

.association{
background: var(--Elements-Bunker-Gray, #24272C);
height:90px;
width:100%;
}

.association h4{
text-transform:uppercase;
font-family: Noto Sans;
font-size: 14px;
font-weight: 700;
letter-spacing: 0.14em;
padding:1%;
text-align:center;
color:#D5D5D5;
margin-top: 0px;
}

.img_sec{
width: 80%;
height:15px;
margin:auto;
display:flex;
justify-content: center;
gap:30px;
margin-top:-8px;
}

.association h6{
font-family: Noto Sans;
font-size: 12px;
font-weight: 400;
line-height: 21.79px;
letter-spacing: 0.04em;
text-align: center;
color:#D5D5D5;
margin-top:11px;
}
.power-container {
  background-color: #2E424D; 
  width: 100%; 
  height: 12px; 
  border-radius: 5px; 
}
.modal {
  /* display: none; */
  position: absolute;
  z-index: 1;
  left: 0;
  top: 20%;
  width: 100%;
  height: 100%;
  overflow: auto; 
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #f1ebeb;
  margin: 12% auto;
  padding: 2%;
  border: 1px solid #888;
  width: 300px;
  color:rgba(3, 3, 3, 0.911);
}
.modal-content h2{
  color:black;
  font-family: Noto Sans;
  font-weight:600;

}
.modal-content input[type="password"],
.modal-content input[type="text"] {
  color: rgb(8, 7, 7);
  background-color: #f1ebeb;
   
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold; 
}
.btn-reset {
  height: 50px;
  width: 150px;
  border-radius: 15px;
  background: var(--Primary-Electric-Blue, #0057FF);
  margin-top: 3%;
  align-items: center; 
  justify-content: center; 
  text-align: center; 
  display: flex; 
  margin:  auto;
  font-size:13px;
  font-weight:500;
}

}
@media only screen and (min-width:481px) and (max-width: 820px) {

.bg_image{
  width: 100vw; 
  min-height:100vh; 
  
  position:absolute;
}
.mgm_logo img.mgm {
    height: 50px;
    width: 60px;
    margin-top:3.5%;
}
  .login-form {
    width: 90%;
    max-width: 420px;
    height:630px;
    max-height: 750px;
  }
  .association {
    width: 100%;
    max-width: 100%;
   
  }
.mgm_logo h4 {
  font-size: 20px;
  font-weight: 600;
}
.footer{
border-radius: 0px 0px 12px 12px;
width:100%;
height:110px;
position: absolute;
bottom: 0;
left: 50%;
transform: translateX(-50%);
} 

.services {
height: 30px;
max-width:100%;
background:#3b3e49fe;
}

.association{
background: var(--Elements-Bunker-Gray, #24272C);
height:90px;
width:100%;
}

.association h4{
font-size: 16px;
font-weight: 700;
padding:1%;
text-align:center;

}

.img_sec{
width: 80%;
height:16px;
margin:auto;
display:flex;
justify-content: center;
gap:30px;
margin-top:-8px;
}

.association h6{

font-size: 12px;
font-weight: 400;
color:#D5D5D5;

}
.power-container {
  background-color: #2E424D; 
  width: 100%; 
  height: 12px; 
  border-radius: 5px; 
}
.modal {
  /* display: none; */
  position: absolute;
  z-index: 1;
  left: 0;
  top: 25%;
  width: 100%;
  height: 100%;
  overflow: auto; 
}
.modal-content {
  background-color: #f1ebeb;
  margin: 12% auto;
  padding: 2%;
  border: 1px solid #888;
  width: 350px !important;
  color:rgba(3, 3, 3, 0.911);
}



.btn-reset {
  height: 50px;
  width: 150px;
  margin-top: 3%;
  font-size:12px;
  font-weight:600;
}

}

</style>
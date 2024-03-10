import React from 'react';
import  "/Users/adarshkumar/tracker-app/src/components/Foot/footer.css";

export default function App() {
  return (
    <footer class="footer">
    <div class="footer-left col-md-4 col-sm-6">
      <p class="about">
        <span> About the company</span> Ut congue augue non tellus bibendum, in varius tellus condimentum. In scelerisque nibh tortor, sed rhoncus odio condimentum in. Sed sed est ut sapien ultrices eleifend. Integer tellus est, vehicula eu lectus tincidunt,
        ultricies feugiat leo. Suspendisse tellus elit, pharetra in hendrerit ut, aliquam quis augue. Nam ut nibh mollis, tristique ante sed, viverra massa.
      </p>
      <div class="icons">
        {/* <a href="#"><i class="fa fa-facebook"></i></a>
        <a href="#"><i class="fa fa-twitter"></i></a> */}
        <a href="https://www.linkedin.com/in/adarshkumar0001/"><i class="bi bi-linkedin"></i></a>
        {/* <a href="adarshrajput1914@gmail.com"><i class="fa fa-google-plus"></i></a> */}
        <a href="https://www.instagram.com/adarsh4240/"><i class="bi bi-instagram"></i></a>
      </div>
    </div>
    <div class="footer-center col-md-4 col-sm-6">
      <div>
        <i class="fa fa-map-marker"></i>
        <p><span> Street name and number</span> Gurugram, INDIA</p>
      </div>
      <div>
        <i class="fa fa-phone"></i>
        <p> (+00) 0000 000 000</p>
      </div>
      <div>
      <i class="bi bi-envelope-at-fill"></i>
        <p><a href="mailto:darshrajput1914@gmail.com"> adarshrajput1914@gmail.com</a></p>
      </div>
    </div>
    <div class="footer-right col-md-4 col-sm-6">
      <h2> Company<span> logo</span></h2>
      <p class="menu">
        <a href="#"> Home</a> |
        <a href="#"> About</a> |
        <a href="#"> Services</a> |
        <a href="#"> Portfolio</a> |
        <a href="#"> News</a> |
        <a href="#"> Contact</a>
      </p>
      <p class="name"> Company Name &copy; 2016</p>
    </div>
  </footer>
  );
}

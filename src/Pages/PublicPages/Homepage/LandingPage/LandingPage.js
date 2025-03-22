import React, { useEffect, useRef, useState } from "react";
import "./LandingPage.scss";
import Navigationbarpublic from "../Navigationbarpublic/Navigationbarpublic";
import AOS from "aos";
import "aos/dist/aos.css";
import Aos from "aos";
import {
  Link as scrollLink,
  Element,
  animateScroll as scroll,
} from "react-scroll";

function LandingPage() {
  const sectionRef = useRef(null);
  const sectionRef2 = useRef(null);

  const scrollToSection = (section = "section1") => {
    console.log(section);
    if (section === "section1") {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
    if (section === "section2") {
      sectionRef2.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
    // scroll.scrollTo(500); // Scrolls to a specific position (e.g., 500 pixels down)
  };

  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 2000,
    });
  }, []);
  return (
    <div className="col-sm-12 p-0 background_main_customer">
      <Navigationbarpublic
        onSectionClick={(e) => scrollToSection(e)}
        scrollToSection={scrollToSection}
      />
      <div className="col-md-12 background_color_header_public pb-5 mb-5 ">
        <div className="col-md-12 custome_main_setting_for_every_page">
          <div className="row">
            <div
              className="col-md-4 padding_adjustments_landingpage_customer m-auto"
              data-aos="fade-right"
            >
              <h1>Take care of your family's health</h1>
              <img className="img-fluid img_line" src="../images/line.png" />
              <h6 className="color_sub_heading11 " data-aos="fade-right">
                Easily and swiftly fulfill promises with the premier doctor booking service worldwide.
              </h6>
              <div className="col-md-12 px-0 pt-4 pb-5">
                <div className="row">
                  <div className="col-md-6  col-6" >
                    <img className="img-fluid" src="../images/google.png" />
                  </div>
                  <div className="col-md-6 col-6" >
                    <img className="img-fluid" src="../images/apple.png" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 text-center margin_auto_col88">
              <img
                className="img-fluid"
                src="../images/bg-customer.png"
                data-aos="fade-left"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default LandingPage;

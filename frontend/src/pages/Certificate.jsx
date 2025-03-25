import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IconDownload, IconMedal } from "@tabler/icons-react";
import { useAuth } from "../context/AuthContext";

const Certificate = () => {
  const certificateRef = useRef(null);
  const { user } = useAuth();
  const [userName, setUserName] = useState("Student");
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.user_metadata && user.user_metadata.full_name) {
      setUserName(user.user_metadata.full_name);
    } else if (user && user.email) {
      const emailName = user.email.split("@")[0];
      setUserName(emailName.charAt(0).toUpperCase() + emailName.slice(1));
    }
  }, [user]);

  const downloadCertificate = async () => {
    // Extensive error handling and logging
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      // Basic prerequisite checks
      const certificate = certificateRef.current;
      if (!certificate) {
        throw new Error("Certificate DOM element not found");
      }

      // Detailed error logging function
      const logDetailedError = (errorMessage, error) => {
        console.error("Certificate Download Error:", errorMessage);
        console.error("Error Details:", error);

        // Capture additional diagnostic information
        const diagnosticInfo = {
          userAgent: navigator.userAgent,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          certificateWidth: certificate.offsetWidth,
          certificateHeight: certificate.offsetHeight,
        };
        console.error("Diagnostic Info:", diagnosticInfo);
      };

      // Ensure complete rendering
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Advanced canvas generation with comprehensive error handling
      let canvas;
      try {
        canvas = await html2canvas(certificate, {
          scale: 2, // Reduced scale for better performance
          useCORS: true,
          logging: false,
          allowTaint: true,
          backgroundColor: "#faf6f0",
          scrollX: 0,
          scrollY: -window.scrollY,
          // Add options to handle complex rendering
          foreignObjectRendering: true,
        });
      } catch (canvasError) {
        logDetailedError("Canvas generation failed", canvasError);
        throw new Error("Could not generate certificate image");
      }

      // Verify canvas generation
      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error("Invalid canvas generated");
      }

      // PDF generation with fixed dimensions for better layout
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // Image conversion with multiple attempts
      let imgData;
      try {
        imgData = canvas.toDataURL("image/png", 1.0);
      } catch (conversionError) {
        logDetailedError("Image conversion failed", conversionError);
        throw new Error("Could not convert certificate to image");
      }

      // Verify image data
      if (!imgData || imgData.length < 1000) {
        throw new Error("Generated image is invalid or too small");
      }

      // Add image to PDF with proper positioning
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const aspectRatio = canvas.width / canvas.height;
      let imgWidth = pageWidth - 20; // 10mm margin on each side
      let imgHeight = imgWidth / aspectRatio;

      // Ensure the image fits on the page
      if (imgHeight > pageHeight - 20) {
        imgHeight = pageHeight - 20;
        imgWidth = imgHeight * aspectRatio;
      }

      // Center the image on the page
      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

      // Generate filename with fallback
      const sanitizedName = userName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      const filename = `vedic_math_certificate_${
        sanitizedName || "student"
      }.pdf`;

      // Attempt to save PDF with error tracking
      try {
        pdf.save(filename);
      } catch (saveError) {
        logDetailedError("PDF save failed", saveError);
        throw new Error("Could not save certificate PDF");
      }
    } catch (error) {
      // Error handling
      console.error("Complete Certificate Download Failure:", error);
      alert(
        "There was a problem downloading your certificate. Please try again."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f12] to-[#1a1a21] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex flex-wrap justify-between items-center">
          <h1 className="font-bricolage font-bold text-3xl md:text-4xl bg-gradient-to-r from-[#e0c9b1] to-[#d4b595] bg-clip-text text-transparent">
            Your Certificate
          </h1>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <button
              onClick={downloadCertificate}
              disabled={isDownloading}
              className={`px-6 py-2.5 ${
                isDownloading
                  ? "bg-[#8b7154] text-[#faf6f0] cursor-not-allowed"
                  : "bg-[#e0c9b1] text-[#0f0f12] hover:bg-[#d4b595]"
              } rounded-md font-medium transition-colors flex items-center`}
            >
              <IconDownload size={18} className="mr-2" />
              {isDownloading ? "Downloading..." : "Download Certificate"}
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-2.5 border border-[#e0c9b1]/30 text-[#e0c9b1] rounded-md font-medium hover:border-[#e0c9b1] transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Fixed height and width to maintain consistent aspect ratio */}
        <div className="mx-auto" style={{ maxWidth: "800px" }}>
          <div
            ref={certificateRef}
            className="relative bg-[#faf6f0] rounded-xl overflow-hidden p-10 text-[#0a0a10]"
            style={{ aspectRatio: "1.414/1", width: "100%" }} // A4 landscape aspect ratio
          >
            {/* Certificate Border Design */}
            <div className="absolute inset-0 border-[20px] border-[#d4b595] rounded-xl pointer-events-none"></div>
            <div className="absolute inset-[20px] border-[2px] border-[#8b7154] rounded-lg pointer-events-none"></div>

            {/* Certificate Content */}
            <div className="flex flex-col items-center justify-between h-full py-8 relative z-10">
              <div>
                <div className="flex justify-center mb-6">
                  <IconMedal size={70} className="text-[#8b7154]" />
                </div>

                <h2 className="font-bricolage font-bold text-[#8b7154] text-3xl mb-2 text-center">
                  Certificate of Completion
                </h2>

                <p className="text-center text-[#2a2a35] mb-6">
                  This is to certify that
                </p>

                <h3 className="text-center font-bricolage font-bold text-4xl text-[#2a2a35] border-b-2 border-[#8b7154] px-8 py-2 mb-6">
                  {userName}
                </h3>

                <p className="text-center text-[#2a2a35] max-w-2xl mx-auto mb-6 text-lg">
                  has successfully completed the{" "}
                  <span className="font-semibold">
                    Vedic Mathematics Course
                  </span>
                  , demonstrating proficiency in mental calculation techniques
                  based on the principles from "Vedic Math" by Himanshu
                  Pancholi.
                </p>
              </div>

              <div className="w-full">
                <div className="text-center mb-6">
                  <div className="font-bricolage font-bold text-2xl bg-gradient-to-r from-[#8b7154] to-[#d4b595] bg-clip-text text-transparent mb-3">
                    VedicMath
                  </div>
                  <div className="relative inline-block">
                    <div className="text-sm text-[#2a2a35]/80 mb-5 font-medium">
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#8b7154]/30 pt-4 mt-4 text-center">
                  <p className="text-sm text-[#2a2a35]/70 font-medium">
                    Based on ancient mathematical techniques from the Vedas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;

import { useState, useEffect } from "react";

const Home = () => {
  const [emails, setEmails] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (userEmail) {
      fetch(`http://localhost:8000/emails-from-db?email=${userEmail}`)
        .then((res) => res.json())
        .then((data) => setEmails(data.emails || []))
        .catch((err) => console.error("Error fetching emails:", err));
    }
  }, [userEmail]);

  return (
    <>
      <div className="bg-[#FCFEEF] h-full">
        <div className="container mx-auto px-4 ">
          <h2 className="text-4xl font-semibold mb-[10px] mx-auto text-center">
            Email
          </h2>
          <div className="flex gap-4 border-y border-gray p-[6px] m-[0]  cursor-pointer">
            <div className="w-[25%] truncate overflow-hidden border-collapse">
              Sender's Name
            </div>
            <div className="w-[30%] truncate overflow-hidden border-collapse">
              Long Email Subject Here
            </div>
            <div className="w-[45%] truncate overflow-hidden border-collapse">
              This is the email content that might be very long...
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;

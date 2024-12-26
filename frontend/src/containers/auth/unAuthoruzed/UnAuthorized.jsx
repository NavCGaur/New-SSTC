import ServiceNavbar from "../../serviceForms/ServiceNavbar";

const UnAuthorized = () => {
    return (
      <div>

        <ServiceNavbar />

        <h1>403 - Unauthorized</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  };
  
  export default UnAuthorized
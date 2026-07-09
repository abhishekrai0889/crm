import { useState } from "react";
import ContactDetailHero from "../components/ContactAdmin/ContactDetailHero";
import EditContactModal from "../components/ContactAdmin/EditContactModal";
import ContactDetailMain from "../components/ContactAdmin/ContactDetailMain";

const ContactDetail = () => {
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ContactDetailHero
          onEdit={() => setOpenEditModal(true)}
        />
         <ContactDetailMain />
      </div>

      <EditContactModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
      />
    </>
  );
};

export default ContactDetail;
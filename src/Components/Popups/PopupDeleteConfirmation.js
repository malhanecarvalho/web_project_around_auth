import iconClose from "../../images/close-icon.png";

function PopupDeleteConfirmation({cardDelete, onDelete, myId, onClose, classPopupDeleteCard}) {

    function deleteCard() {
        if (cardDelete.owner_id !== myId) {
          onDelete(cardDelete._id);
        } else {
          console.error("Usuario não é dono do cartao");
        }
      }

      function handleSubmitDeleteCard(evt){
        evt.preventDefault();
        deleteCard()
        onClose()
          }

  return (
    <section className={`${classPopupDeleteCard} popup-delete`} id="popup-confirmation">
      <div className="popup-delete__itens">
        <img
          className="popup-delete__icon"
          id="close-popup"
          alt="icone fechar popup"
          src={iconClose} onClick={onClose}
        />
        <h2 className="popup-delete__title">Tem Certeza?</h2>
        <button type="submit" className="popup-delete__button" onClick={handleSubmitDeleteCard}> 
          Sim
        </button>
      </div>
    </section>
  );
}

export default PopupDeleteConfirmation;

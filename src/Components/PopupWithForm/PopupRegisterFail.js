import iconFail from '../../images/icon_failed.svg'
import iconClose from "../../images/icone_fechar.svg";

function RegisterFail({onClose, classPopupRegisterFail}) {

  return (
    <section className={`${classPopupRegisterFail} popup-fail`}>
      <div className="popup-fail__itens">
        <img
          className="popup-fail__icon_close"
          id="close-popup"
          alt="icone fechar popup"
          src={iconClose} onClick={onClose}
        />
        <img
          className="popup-fail__icon_fail"
          id="close-popup"
          alt="icone fail"
          src={iconFail}
        />
        <h2 className="popup-fail__title">Ops, algo deu errado! 
        Por favor, tente novamente..</h2>
      </div>
    </section>
  );
}

export default RegisterFail;
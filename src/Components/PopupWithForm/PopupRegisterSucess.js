import iconSucess from '../../images/icon_sucess.svg'
import iconClose from "../../images/icone_fechar.svg";

function RegisterSucess({classPopupRegisterSucess}) {

  return (
    <section className={`${classPopupRegisterSucess} popup-sucess`}>
      <div className="popup-sucess__itens">
        <img
          className="popup-sucess__icon_close"
          id="close-popup"
          alt="icone fechar popup"
          src={iconClose}
        />
        <img
          className="popup-sucess__icon_sucess"
          id="close-popup"
          alt="icone sucesso"
          src={iconSucess}
        />
        <h2 className="popup-sucess__title">Vitória! Agora você é um membro.</h2>
      </div>
    </section>
  );
}

export default RegisterSucess;
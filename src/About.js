import React from "react"; // eslint-disable-line no-unused-vars
import { Container, Row, Col } from "reactstrap";
import ReactPlayer from "react-player";
import AccordionTab from "./components/AccordionTab/AccordionTab";
import "./About.css";
import "./StaticPages.css";
import { Link } from "react-router-dom";
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from "react-intl";

class About extends React.Component {
  render() {
    const communityLink = (
      <Link target="_blank" to="http://participedia.net/en/user/register">
        <FormattedMessage id="join_community" />
      </Link>
    );
    const ccLink = (
      <Link
        target="_blank"
        to="http://creativecommons.org/licenses/by-nc-sa/3.0/"
      >
        <FormattedMessage id="creative_commons" />
      </Link>
    );
    const caseLink = (
      <Link target="_blank" to="http://participedia.net/en/browse/cases">
        <FormattedMessage id="cases" />
      </Link>
    );
    const methodLink = (
      <Link target="_blank" to="http://participedia.net/en/browse/methods">
        <FormattedMessage id="methods" />
      </Link>
    );
    const orgLink = (
      <Link
        target="_blank"
        to="http://participedia.net/en/browse/organizations"
      >
        <FormattedMessage id="organizations" />
      </Link>
    );
    const publishLink = (
      <Link target="_blank" to="http://participedia.net/en/create-content">
        <FormattedMessage id="publishing" />
      </Link>
    );
    const teachLink = (
      <Link
        target="_blank"
        to="http://participedia.net/content/assign-participedia-classroom"
      >
        <FormattedMessage id="teach_link" />
      </Link>
    );
    const sshrcLink = (
      <Link target="_blank" to="http://www.bfna.org/">
        <FormattedMessage id="sshrc_grant" />
      </Link>
    );
    const sshrcLink2 = (
      <Link
        target="_blank"
        to="http://www.sshrc-crsh.gc.ca/home-accueil-eng.aspx"
      >
        <FormattedMessage id="sshrc" />
      </Link>
    );
    const bertelsmannLink = (
      <Link
        target="_blank"
        to="http://www.sshrc-crsh.gc.ca/home-accueil-eng.aspx"
      >
        <FormattedMessage id="bertelsmann_foundation" />
      </Link>
    );
    return (
      <Container fluid={true} className="about static">
        <Row>
          <Col md={{ size: 6 }} className="ml-auto mr-auto">
            <h1>
              <FormattedMessage id="welcome_participedia" />
            </h1>
            <h2>
              <FormattedMessage id="about_intro" />
            </h2>
            <ReactPlayer
              width="110%"
              controls
              url="https://vimeo.com/219546454"
            />
            <h2>
              <FormattedMessage id="get_involved" />
            </h2>
            <FormattedMessage
              id="about_involved_1"
              values={{ communityLink, ccLink }}
            />
            <h3 className="sub-head pt-1">
              <FormattedMessage id="explore" />
            </h3>
            <FormattedMessage
              id="explore_intro"
              values={{ caseLink, methodLink, orgLink }}
            />
            <h3 className="sub-head pt-1">
              <FormattedMessage id="contribute" />
            </h3>
            <FormattedMessage id="contribute_intro" values={{ publishLink }} />
            <h3 className="sub-head pt-1">
              <FormattedMessage id="teach" />
            </h3>
            <FormattedMessage id="teach_intro" values={{ teachLink }} />
            <h2>
              <FormattedMessage id="community" />
            </h2>
            <p className="pb-1">
              <FormattedMessage id="community_text_1" />
            </p>
            <p>
              <FormattedMessage id="community_text_2" />
            </p>
            <div className="accordion">
              <AccordionTab titleId="members">
                <div className="content">
                  <p className="text pb-1">
                    <FormattedMessage id="members_intro" />
                  </p>
                  <Link
                    target="_blank"
                    to="http://participedia.net/en/user/register"
                  >
                    <FormattedMessage id="join_now" />
                  </Link>
                </div>
              </AccordionTab>
              <AccordionTab titleId="partners">
                <div className="content">
                  <p className="text">
                    <FormattedMessage id="partners_intro" />
                  </p>
                  <div className="sub-accordion">
                    <AccordionTab sub={true} titleId="principal_investigator">
                      <div className="sub-content">
                        <div className="person">
                          <span className="name">
                            Mark E. Warren,&nbsp;
                            <FormattedMessage id="mark_warren_title" />
                          </span>
                          <p>
                            <FormattedMessage id="mark_warren_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="mark_warren_org_2" />
                          </p>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab sub={true} titleId="co_investigators">
                      <div className="sub-content">
                        <div className="person">
                          <span className="name">Julia Abelson</span>
                          <p>
                            <FormattedMessage id="julia_abelson_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="julia_abelson_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Marco Adria</span>
                          <p>
                            <FormattedMessage id="marco_adria_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="marco_adria_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Giovanni Allegretti</span>
                          <p>
                            <FormattedMessage id="giovanni_allegretti_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="giovanni_allegretti_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Joanna Ashworth</span>
                          <p>
                            <FormattedMessage id="joanna_ashworth_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="joanna_ashworth_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Leonardo Avritzer</span>
                          <p>
                            <FormattedMessage id="leonardo_avritzer_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="leonardo_avritzer_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Michael Burgess</span>
                          <p>
                            <FormattedMessage id="michael_burgess_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="michael_burgess_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Simone Chambers</span>
                          <p>
                            <FormattedMessage id="simone_chambers_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="simone_chambers_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Nancy C. Doubleday</span>
                          <p>
                            <FormattedMessage id="nancy_doubleday_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="nancy_doubleday_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Luciana Duranti</span>
                          <p>
                            <FormattedMessage id="luciana_duranti_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="luciana_duranti_org_2" />
                          </p>
                          <p>
                            <FormattedMessage id="luciana_duranti_org_3" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">John Dryzek</span>
                          <p>
                            <FormattedMessage id="john_dryzek_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="john_dryzek_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Amber Frid-Jimenez</span>
                          <p>
                            <FormattedMessage id="amber_frid_org_1a" />
                          </p>
                          <p>
                            <FormattedMessage id="amber_frid_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Archon Fung</span>
                          <p>
                            <FormattedMessage id="archon_fung_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="archon_fung_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">John Gastil</span>
                          <p>
                            <FormattedMessage id="john_gastil_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="john_gastil_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">John Gaventa</span>
                          <p>
                            <FormattedMessage id="john_gaventa_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="john_gaventa_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Baogang He</span>
                          <p>
                            <FormattedMessage id="baogang_he_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="baogang_he_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Bonny Ibhawoh</span>
                          <p>
                            <FormattedMessage id="bonny_ibhawoh_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="bonny_ibhawoh_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Jan-Hendrik Kamlage</span>
                          <p>
                            <FormattedMessage id="jan_kamlage_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="jan_kamlage_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Paul Kingston</span>
                          <p>
                            <FormattedMessage id="paul_kingston_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="paul_kingston_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Rodolfo Lewanski</span>
                          <p>
                            <FormattedMessage id="rodolfo_lewanski_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="rodolfo_lewanski_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Peter Loewen</span>
                          <p>
                            <FormattedMessage id="peter_loewen_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="peter_loewen_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Françoise Montambeaul</span>
                          <p>
                            <FormattedMessage id="françoise_montambeault_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="françoise_montambeault_org_2" />
                          </p>
                          <p>
                            <FormattedMessage id="françoise_montambeault_org_3" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Tina Nabatchi</span>
                          <p>
                            <FormattedMessage id="tina_nabatchi_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="tina_nabatchi_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Patrizia Nanz</span>
                          <p>
                            <FormattedMessage id="patrizia_nanz_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="patrizia_nanz_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Laurence Piper</span>
                          <p>
                            <FormattedMessage id="laurence_piper_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="laurence_piper_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Graham Smith</span>
                          <p>
                            <FormattedMessage id="graham_smith_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="graham_smith_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Dietlind Stolle</span>
                          <p>
                            <FormattedMessage id="dietlind_stolle_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="dietlind_stolle_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Dietlind Stolle</span>
                          <p>
                            <FormattedMessage id="dietlind_stolle_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="dietlind_stolle_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Bettina von Lieres</span>
                          <p>
                            <FormattedMessage id="bettina_von_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="bettina_von_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">June Webber</span>
                          <p>
                            <FormattedMessage id="june_webber_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="june_webber_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Melissa Williams</span>
                          <p>
                            <FormattedMessage id="melissa_williams_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="melissa_williams_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Jirong Yan</span>
                          <p>
                            <FormattedMessage id="jirong_yan_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="jirong_yan_org_2" />
                          </p>
                          <p>
                            <FormattedMessage id="jirong_yan_org_3" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Xiaojin Zhang</span>
                          <p>
                            <FormattedMessage id="xiaojin_zhang_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="xiaojin_zhang_org_2" />
                          </p>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab sub={true} titleId="collaborators">
                      <div className="sub-content">
                        <div className="person">
                          <span className="name">André Bächtiger</span>
                          <p>
                            <FormattedMessage id="andre_bachtiger_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="andre_bachtiger_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Kaustuv Bandyopadhyay</span>
                          <p>
                            <FormattedMessage id="kaustuv_bandyopadhyay_org_1" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Claudia Feres Faria</span>
                          <p>
                            <FormattedMessage id="claudia_feres_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="claudia_feres_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Dustin Garrick</span>
                          <p>
                            <FormattedMessage id="dustin_garrick_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="dustin_garrick_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Katherine Gillieson</span>
                          <p>
                            <FormattedMessage id="katherine_gillieson_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="katherine_gillieson_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Jez Hall</span>
                          <p>
                            <FormattedMessage id="jez_hall_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="jez_hall_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Sandy Heierbacher</span>
                          <p>
                            <FormattedMessage id="sandy_heierbacher_org" />
                          </p>
                          <p>
                            <FormattedMessage id="sandy_heierbacher_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">David Hume</span>
                          <p>
                            <FormattedMessage id="david_hume_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="david_hume_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">David Kahane</span>
                          <p>
                            <FormattedMessage id="david_kahane_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="david_kahane_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Katie Knobloch</span>
                          <p>
                            <FormattedMessage id="katie_knobloch_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="katie_knobloch_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Julien Landry</span>
                          <p>
                            <FormattedMessage id="julien_landry_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="julien_landry_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Matt Leighninger</span>
                          <p>
                            <FormattedMessage id="matt_leighninger_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="matt_leighninger_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Michael MacKenzie</span>
                          <p>
                            <FormattedMessage id="michael_mackenzie_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="michael_mackenzie_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Marjorie Correa Marona</span>
                          <p>
                            <FormattedMessage id="marjorie_correa_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="marjorie_correa_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Ricardo Fabrino Mendonça</span>
                          <p>
                            <FormattedMessage id="ricardo_mendonca_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="ricardo_mendonca_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Tiago Peixoto</span>
                          <p>
                            <FormattedMessage id="tiago_peixoto_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="tiago_peixoto_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Marcus Abílio Gomes Pereira
                          </span>
                          <p>
                            <FormattedMessage id="marcus_gomes_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="marcus_gomes_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Matthew Ryan</span>
                          <p>
                            <FormattedMessage id="matthew_ryan_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="matthew_ryan_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Hollie Russon-Gilman</span>
                          <p>
                            <FormattedMessage id="hollie_russon_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="hollie_russon_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Alexandra Samuel</span>
                        </div>
                        <div className="person">
                          <span className="name">Eleonora Schettini Cunha</span>
                          <p>
                            <FormattedMessage id="eleonora_schettini_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="eleonora_schettini_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Eduardo Moreira da Silva</span>
                          <p>
                            <FormattedMessage id="eduardo_moreira_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="eduardo_moreira_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Leonardo Barros Soares</span>
                          <p>
                            <FormattedMessage id="leonardo_barros_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="leonardo_barros_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Paolo Spada</span>
                          <p>
                            <FormattedMessage id="paolo_spada_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="paolo_spada_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Joanna Wilson</span>
                          <p>
                            <FormattedMessage id="joanna_wilson_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="joanna_wilson_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Changdong Zhang</span>
                          <p>
                            <FormattedMessage id="changdong_zhang_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="changdong_zhang_org_2" />
                          </p>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab sub={true} titleId="organizations">
                      <div className="sub-content">
                        <div className="person">
                          <span className="name">
                            University of British Columbia
                          </span>
                          <p>
                            <FormattedMessage id="ubc_dept" />
                          </p>
                          <p>Vancouver, Canada</p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Coady International Institute
                          </span>
                          <p>St. Francis Xavier University</p>
                          <p>Antigonish, Canada</p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Deliberative Democracy Consortium
                          </span>
                          <p>Washington, DC</p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Emily Carr University of Art + Design
                          </span>
                          <p>
                            <FormattedMessage id="ecuad_dept" />
                          </p>
                          <p>Vancouver, Canada</p>
                        </div>
                        <div className="person">
                          <span className="name">Harvard University</span>
                          <p>
                            <FormattedMessage id="harvard_dept" />
                          </p>
                          <p>Cambridge, Massachusetts</p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="international_observatory" />
                          </span>
                          <p>
                            <FormattedMessage id="int_observatory_location" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="kwi" />
                          </span>
                          <p>
                            <FormattedMessage id="kwi_location" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="mcgill" />
                          </span>
                          <p>
                            <FormattedMessage id="mcgill_dept" />
                          </p>
                          <p>
                            <FormattedMessage id="mcgill_location" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="mcmaster" />
                          </span>
                          <p>
                            <FormattedMessage id="mcmaster_dept" />
                          </p>
                          <p>
                            <FormattedMessage id="mcmaster_location" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="nanyang" />
                          </span>
                          <p>
                            <FormattedMessage id="nanyang_dept" />
                          </p>
                          <p>
                            <FormattedMessage id="nanyang_location" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="national_coalition" />
                          </span>
                          <p>
                            <FormattedMessage id="national_coalition_dept" />
                          </p>
                          <p>
                            <FormattedMessage id="national_coalition_location" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="peking" />
                          </span>
                          <p>
                            <FormattedMessage id="peking_dept" />
                          </p>
                          <p>
                            <FormattedMessage id="peking_location" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="pennsylvania_su" />
                          </span>
                          <p>
                            <FormattedMessage id="pennsylvania_su_dept" />
                          </p>
                          <p>
                            <FormattedMessage id="pennsylvania_su_location" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="app" />
                          </span>
                          <p>
                            <FormattedMessage id="app_dept" />
                          </p>
                          <p>
                            <FormattedMessage id="app_location" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="syracuse" />
                          </span>
                          <p>
                            <FormattedMessage id="syracuse_dept" />
                          </p>
                          <p>
                            <FormattedMessage id="syracuse_location" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="tsinghua" />
                          </span>
                          <p>
                            <FormattedMessage id="tsinghua_dept" />
                          </p>
                          <p>
                            <FormattedMessage id="tsinghua_location" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="coimbra" />
                          </span>
                          <p>
                            <FormattedMessage id="coimbra_dept" />
                          </p>
                          <p>
                            <FormattedMessage id="coimbra_location" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="minas_gerais" />
                          </span>
                          <p>
                            <FormattedMessage id="minas_gerais_dept" />
                          </p>
                          <p>
                            <FormattedMessage id="minas_gerais_location" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="u_alberta" />
                          </span>
                          <p>
                            <FormattedMessage id="u_alberta_dept" />
                          </p>
                          <p>
                            <FormattedMessage id="u_alberta_location" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="u_bologna" />
                          </span>
                          <p>
                            <FormattedMessage id="u_bologna_dept" />
                          </p>
                          <p>
                            <FormattedMessage id="u_bologna_location" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="ubc" />
                          </span>
                          <p>
                            <FormattedMessage id="ubc_dept_1" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="ubc" />
                          </span>
                          <p>
                            <FormattedMessage id="ubc_dept_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="u_canberra" />
                          </span>
                          <p>
                            <FormattedMessage id="u_canberra_dept" />
                          </p>
                          <p>
                            <FormattedMessage id="u_canberra_location" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="u_montreal" />
                          </span>
                          <p>
                            <FormattedMessage id="u_montreal_dept" />
                          </p>
                          <p>
                            <FormattedMessage id="u_montreal_location" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="u_southampton" />
                          </span>
                          <p>
                            <FormattedMessage id="u_southampton_dept" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="u_toronto" />
                          </span>
                          <p>
                            <FormattedMessage id="u_toronto_dept" />
                          </p>
                          <p>
                            <FormattedMessage id="u_toronto_loc" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="u_toronto_s" />
                          </span>
                          <p>
                            <FormattedMessage id="u_toronto_s_dept" />
                          </p>
                          <p>
                            <FormattedMessage id="u_toronto_loc" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="u_western_cape" />
                          </span>
                          <p>
                            <FormattedMessage id="u_western_cape_dept" />
                          </p>
                          <p>
                            <FormattedMessage id="u_western_cape_location" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="u_westminster" />
                          </span>
                          <p>
                            <FormattedMessage id="u_westminster_dept" />
                          </p>
                          <p>
                            <FormattedMessage id="u_westminster_location" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            <FormattedMessage id="wbi" />
                          </span>
                          <p>
                            <FormattedMessage id="wbi_dept" />
                          </p>
                          <p>
                            <FormattedMessage id="wbi_location" />
                          </p>
                        </div>
                      </div>
                    </AccordionTab>
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab titleId="committees">
                <div className="content">
                  <p className="text">
                    <FormattedMessage id="committees_intro" />
                  </p>
                  <div className="sub-accordion">
                    <AccordionTab sub={true} titleId="executive_committee">
                      <div className="sub-content">
                        <FormattedMessage
                          id="executive_committee_intro"
                          values={{ sshrcLink }}
                        />
                        <div className="person">
                          <span className="name">
                            Marco Adria,&nbsp;
                            <FormattedMessage id="marco_adria_title" />
                          </span>
                          <p>
                            <FormattedMessage id="marco_adria_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="marco_adria_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Amber Frid-Jimenez,&nbsp;
                            <FormattedMessage id="amber_frid_title" />
                          </span>
                          <p>
                            <FormattedMessage id="amber_frid_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="amber_frid_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Archon Fung,&nbsp;
                            <FormattedMessage id="archon_fung_title" />
                          </span>
                          <p>
                            <FormattedMessage id="archon_fung_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="archon_fung_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Patrick L. Scully,&nbsp;
                            <FormattedMessage id="pat_scully_title" />
                          </span>
                        </div>
                        <div className="person">
                          <span className="name">
                            Graham Smith,&nbsp;
                            <FormattedMessage id="graham_smith_title" />
                          </span>
                          <p>
                            <FormattedMessage id="graham_smith_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="graham_smith_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Bettina Von Lieres,&nbsp;
                            <FormattedMessage id="bettina_von_title" />
                          </span>
                          <p>
                            <FormattedMessage id="bettina_von_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="bettina_von_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Mark E. Warren,&nbsp;
                            <FormattedMessage id="mark_warren_title" />
                          </span>
                          <p>
                            <FormattedMessage id="mark_warren_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="mark_warren_org_2" />
                          </p>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab sub={true} titleId="dt_committee">
                      <div className="sub-content">
                        <p className="text">
                          <FormattedMessage id="dt_committee_intro" />
                        </p>
                        <div className="person">
                          <span className="name">
                            David Ascher,&nbsp;
                            <FormattedMessage id="david_ascher_title_2" />
                          </span>
                        </div>
                        <div className="person">
                          <span className="name">
                            Jesi Carson,&nbsp;
                            <FormattedMessage id="jesi_carson_title" />
                          </span>
                          <p>
                            <FormattedMessage id="jesi_carson_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="jesi_carson_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Andrea Del Rio,&nbsp;
                            <FormattedMessage id="andrea_delrio_title" />
                          </span>
                          <p>
                            <FormattedMessage id="andrea_delrio_org" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Dethe Elza,&nbsp;
                            <FormattedMessage id="dethe_elza_title" />
                          </span>
                        </div>
                        <div className="person">
                          <span className="name">
                            Amber Frid-Jimenez,&nbsp;
                            <FormattedMessage id="amber_frid_title_2" />
                          </span>
                          <p>
                            <FormattedMessage id="amber_frid_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="amber_frid_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Sam Jiang,&nbsp;
                            <FormattedMessage id="sam_jiang_title" />
                          </span>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab
                      sub={true}
                      titleId="communications_knowledge_committee"
                    >
                      <div className="sub-content">
                        <p className="text">
                          <FormattedMessage id="comms_know_intro" />
                        </p>
                        <div className="person">
                          <span className="name">
                            Marco Adria,&nbsp;
                            <FormattedMessage id="marco_adria_title" />
                          </span>
                          <p>
                            <FormattedMessage id="marco_adria_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="marco_adria_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Jesi Carson,&nbsp;
                            <FormattedMessage id="jesi_carson_title" />
                          </span>
                          <p>
                            <FormattedMessage id="jesi_carson_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="jesi_carson_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Sandy Heierbacher,&nbsp;
                            <FormattedMessage id="sandy_heierbacher_title" />
                          </span>
                          <p>
                            <FormattedMessage id="sandy_heierbacher_org" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Matt Leighninger,&nbsp;
                            <FormattedMessage id="matt_leighninger_title" />
                          </span>
                          <p>
                            <FormattedMessage id="matt_leighninger_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="matt_leighninger_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Paolo Spada,&nbsp;
                            <FormattedMessage id="paolo_spada_title" />
                          </span>
                          <p>
                            <FormattedMessage id="paolo_spada_org" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Secchi Michelangelo,&nbsp;
                            <FormattedMessage id="secchi_michelangelo_title" />
                          </span>
                          <p>
                            <FormattedMessage id="secchi_michelangelo_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="secchi_michelangelo_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Scott Fletcher,&nbsp;
                            <FormattedMessage id="scott_fletcher_title" />
                          </span>
                          <p>
                            <FormattedMessage id="scott_fletcher_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="scott_fletcher_org_2" />
                          </p>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab
                      sub={true}
                      titleId="teaching_training_committee"
                    >
                      <div className="sub-content">
                        <p className="text">
                          <FormattedMessage id="teaching_training_committee_intro" />
                        </p>
                        <div className="person">
                          <span className="name">
                            Joanna Ashworth,&nbsp;
                            <FormattedMessage id="co_investigator" />
                          </span>
                          <p>
                            <FormattedMessage id="joanna_ashworth_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="joanna_ashworth_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Bonny Ibhawoh,&nbsp;
                            <FormattedMessage id="co_investigator" />
                          </span>
                          <p>
                            <FormattedMessage id="bonny_ibhawoh_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="bonny_ibhawoh_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Katie Knobloch,&nbsp;
                            <FormattedMessage id="collaborator" />
                          </span>
                          <p>
                            <FormattedMessage id="katie_knobloch_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="katie_knobloch_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Julien Landry,&nbsp;
                            <FormattedMessage id="collaborator" />
                          </span>
                          <p>
                            <FormattedMessage id="julien_landry_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="julien_landry_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Marjorie Correa Marona,&nbsp;
                            <FormattedMessage id="collaborator" />
                          </span>
                          <p>
                            <FormattedMessage id="marjorie_correa_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="marjorie_correa_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Françoise Montambeaul,&nbsp;
                            <FormattedMessage id="co_investigator" />
                          </span>
                          <p>
                            <FormattedMessage id="françoise_montambeault_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="françoise_montambeault_org_2" />
                          </p>
                          <p>
                            <FormattedMessage id="françoise_montambeault_org_3" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Tina Nabatchi,&nbsp;
                            <FormattedMessage id="co_investigator" />
                          </span>
                          <p>
                            <FormattedMessage id="tina_nabatchi_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="tina_nabatchi_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Laurence Piper,&nbsp;
                            <FormattedMessage id="co_investigator" />
                          </span>
                          <p>
                            <FormattedMessage id="laurence_piper_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="laurence_piper_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Matthew Ryan</span>
                          <p>
                            <FormattedMessage id="matthew_ryan_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="matthew_ryan_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Timothy Shaffer</span>
                          <p>
                            <FormattedMessage id="timothy_shaffer_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="timothy_shaffer_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Nancy Thomas</span>
                          <p>
                            <FormattedMessage id="nancy_thomas_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="nancy_thomas_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Bettina von Lieres,&nbsp;
                            <FormattedMessage id="co_investigator" />
                          </span>
                          <p>
                            <FormattedMessage id="bettina_von_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="bettina_von_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Ethan Way,&nbsp;
                            <FormattedMessage id="ethan_way_title" />
                          </span>
                          <p>
                            <FormattedMessage id="ethan_way_org_1" />
                          </p>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab
                      sub={true}
                      titleId="research_design_committee"
                    >
                      <div className="sub-content">
                        <p className="text">
                          <FormattedMessage id="research_design_committee_intro" />
                        </p>
                        <div className="person">
                          <span className="name">
                            Leonardo Avritzer,&nbsp;
                            <FormattedMessage id="co_investigator" />
                          </span>
                          <p>
                            <FormattedMessage id="leonardo_avritzer_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Selen Ercan</span>
                          <p>
                            <FormattedMessage id="selen_ercan_org_1" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Matt Leighninger,&nbsp;
                            <FormattedMessage id="collaborator" />
                          </span>
                          <p>
                            <FormattedMessage id="matt_leighninger_org_3" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Peter Loewen,&nbsp;
                            <FormattedMessage id="co_investigator" />
                          </span>
                          <p>
                            <FormattedMessage id="peter_loewen_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Michael MacKenzie</span>
                          <p>
                            <FormattedMessage id="michael_mackenzie_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Patrizia Nanz</span>
                          <p>
                            <FormattedMessage id="patrizia_nanz_org_3" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Lucy Parry,&nbsp;
                            <FormattedMessage id="ra" />
                          </span>
                          <p>
                            <FormattedMessage id="lucy_parry_org_1" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Matthew Ryan,&nbsp;
                            <FormattedMessage id="collaborator" />
                          </span>
                          <p>
                            <FormattedMessage id="matthew_ryan_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Graham Smith,&nbsp;
                            <FormattedMessage id="co_investigator" />
                          </span>
                          <p>
                            <FormattedMessage id="graham_smith_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Dietlind Stolle</span>
                          <p>
                            <FormattedMessage id="dietlind_stolle_org_2" />
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Mark E. Warren,&nbsp;
                            <FormattedMessage id="mark_warren_title" />
                          </span>
                          <p>
                            <FormattedMessage id="mark_warren_org_1" />
                          </p>
                          <p>
                            <FormattedMessage id="mark_warren_org_2" />
                          </p>
                        </div>
                      </div>
                    </AccordionTab>
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab titleId="funders">
                <div className="content">
                  <FormattedMessage
                    id="funders_intro"
                    values={{ sshrcLink2, bertelsmannLink }}
                  />
                </div>
              </AccordionTab>
              <AccordionTab titleId="staff">
                <div className="content">
                  <p className="text">
                    <FormattedMessage id="staff_intro" />
                  </p>
                  <div className="person">
                    <span className="name">
                      David Ascher,&nbsp;
                      <FormattedMessage id="david_ascher_title" />
                    </span>
                  </div>
                  <div className="person">
                    <span className="name">
                      Jesi Carson,&nbsp;
                      <FormattedMessage id="jesi_carson_title" />
                    </span>
                    <p>
                      <FormattedMessage id="jesi_carson_org_2" />
                    </p>
                  </div>
                  <div className="person">
                    <span className="name">
                      Rebecca Monnerat,&nbsp;
                      <FormattedMessage id="rebecca_monnerat_title" />
                    </span>
                    <p>
                      <FormattedMessage id="rebecca_monnerat_org" />
                    </p>
                  </div>
                  <div className="person">
                    <span className="name">
                      Patrick L. Scully,&nbsp;
                      <FormattedMessage id="pat_scully_title" />
                    </span>
                  </div>
                  <div className="person">
                    <span className="name">
                      Mark E. Warren,&nbsp;
                      <FormattedMessage id="mark_warren_title" />
                    </span>
                    <p>
                      <FormattedMessage id="mark_warren_org_1" />
                    </p>
                    <p>
                      <FormattedMessage id="mark_warren_org_2" />
                    </p>
                  </div>
                </div>
              </AccordionTab>
            </div>
            <h2>
              <FormattedMessage id="content" />
            </h2>
            <div className="text">
              <FormattedMessage id="content_intro" />
            </div>
            <div className="accordion">
              <AccordionTab titleId="cases">
                <div className="content">
                  <p className="text">
                    <FormattedMessage id="cases_content" />
                  </p>
                </div>
              </AccordionTab>
              <AccordionTab titleId="methods">
                <div className="content">
                  <p className="text">
                    <FormattedMessage id="methods_content" />
                  </p>
                </div>
              </AccordionTab>
              <AccordionTab titleId="organizations">
                <div className="content">
                  <p className="text">
                    <FormattedMessage id="organizations_content" />
                  </p>
                </div>
              </AccordionTab>
            </div>
            <h2>
              <FormattedMessage id="attribution" />
            </h2>
            <div className="text">
              <FormattedMessage id="attribution_intro" />
            </div>
            <div className="accordion">
              <AccordionTab titleId="csl_project">
                <div className="content">
                  <p className="text">
                    <FormattedHTMLMessage id="csl_content" />
                  </p>
                </div>
              </AccordionTab>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default injectIntl(About);

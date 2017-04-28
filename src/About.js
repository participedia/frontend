import React from "react"; // eslint-disable-line no-unused-vars
import { Container, Row, Col } from "reactstrap";
import AccordionTab from "./components/AccordionTab/AccordionTab";
import "./About.css";
import "./StaticPages.css";
import { injectIntl, FormattedMessage } from "react-intl";

class About extends React.Component {
  render() {
    const communityLink = (
      <a href="http://participedia.net/en/user/register">{this.props.intl.formatMessage({ id: "join_community" })}</a>
    );
    const ccLink = (
      <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/">{this.props.intl.formatMessage({ id: "creative_commons" })}</a>
    );
    const caseLink = (
      <a href="http://participedia.net/en/browse/cases">{this.props.intl.formatMessage({ id: "cases" })}</a>
    );
    const methodLink = (
      <a href="http://participedia.net/en/browse/methods">{this.props.intl.formatMessage({ id: "methods" })}</a>
    );
    const orgLink = (
      <a href="http://participedia.net/en/browse/organizations">{this.props.intl.formatMessage({ id: "organizations" })}</a>
    );
    const publishLink = (
      <a href="http://participedia.net/en/create-content">{this.props.intl.formatMessage({ id: "publishing" })}</a>
    );
    const teachLink = (
      <a href="http://participedia.net/content/assign-participedia-classroom">{this.props.intl.formatMessage({ id: "teach_link" })}</a>
    );
    const sshrcLink = (
      <a href="http://www.bfna.org/">{this.props.intl.formatMessage({ id: "sshrc_grant" })}</a>
    );
    const sshrcLink2 = (
      <a href="http://www.sshrc-crsh.gc.ca/home-accueil-eng.aspx">{this.props.intl.formatMessage({ id: "sshrc" })}</a>
    );
    const bertelsmannLink = (
      <a href="http://www.sshrc-crsh.gc.ca/home-accueil-eng.aspx">{this.props.intl.formatMessage({ id: "bertelsmann_foundation" })}</a>
    );
    return (
      <Container fluid={false} className="about static">
        <Row>
          <Col lg={{ size: 8, offset: 2 }}>
            <h1>
              {this.props.intl.formatMessage({ id: "welcome_participedia" })}
            </h1>
            <h2>{this.props.intl.formatMessage({ id: "about_intro" })}</h2>
            <h2>{this.props.intl.formatMessage({ id: "get_involved" })}</h2>
            <FormattedMessage
              id="about_involved_1"
              values={{ communityLink, ccLink }}
            />
            <h6 className="sub-head pt-1">{this.props.intl.formatMessage({ id: "explore" })}</h6>
            <FormattedMessage
              id="explore_intro"
              values={{ caseLink, methodLink, orgLink }}
            />
            <h6 className="sub-head pt-1">{this.props.intl.formatMessage({ id: "contribute" })}</h6>
            <FormattedMessage
              id="contribute_intro"
              values={{ publishLink }}
            />
            <h6 className="sub-head pt-1">{this.props.intl.formatMessage({ id: "teach" })}</h6>
            <FormattedMessage
              id="teach_intro"
              values={{ teachLink }}
            />
            <h2>{this.props.intl.formatMessage({ id: "community" })}</h2>
            <p className="pb-1">{this.props.intl.formatMessage({ id: "community_text_1" })}</p>
            <p>{this.props.intl.formatMessage({ id: "community_text_2" })}</p>
            <div className="accordion">
              <AccordionTab
                title={this.props.intl.formatMessage({ id: "members" })}>
                <div className="content">
                  <p className="text pb-1">
                    {this.props.intl.formatMessage({ id: "members_intro" })}
                  </p>
                  <a href="http://participedia.net/en/user/register">{this.props.intl.formatMessage({ id: "join_now" })}</a>
                </div>
              </AccordionTab>
              <AccordionTab
                title={this.props.intl.formatMessage({ id: "partners" })}>
                <div className="content">
                  <p className="text">
                    {this.props.intl.formatMessage({ id: "partners_intro" })}
                  </p>
                  <div className="sub-accordion">
                    <AccordionTab
                      title={this.props.intl.formatMessage({
                        id: "principal_investigator"
                      })}
                    >
                      <div className="sub-content">
                        <div className="person">
                          <span className="name"><a href="#">Mark E. Warren</a>,&nbsp;{this.props.intl.formatMessage({ id: "mark_warren_title" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "mark_warren_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "mark_warren_org_2" })}</p>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab
                      title={this.props.intl.formatMessage({
                        id: "co_investigators"
                      })}
                    >
                      <div className="sub-content">
                        <div className="person">
                          <span className="name"><a href="#">Julia Abelson</a></span>
                          <p>{this.props.intl.formatMessage({ id: "julia_abelson_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "julia_abelson_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Marco Adria</a></span>
                          <p>{this.props.intl.formatMessage({ id: "marco_adria_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "marco_adria_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Giovanni Allegretti</a></span>
                          <p>{this.props.intl.formatMessage({ id: "giovanni_allegretti_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "giovanni_allegretti_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Joanna Ashworth</a></span>
                          <p>{this.props.intl.formatMessage({ id: "joanna_ashworth_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "joanna_ashworth_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Leonardo Avritzer</a></span>
                          <p>{this.props.intl.formatMessage({ id: "leonardo_avritzer_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "leonardo_avritzer_org_2" })}</p>
                        </div>                        
                        <div className="person">
                          <span className="name"><a href="#">Michael Burgess</a></span>
                          <p>{this.props.intl.formatMessage({ id: "michael_burgess_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "michael_burgess_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Simone Chambers</a></span>
                          <p>{this.props.intl.formatMessage({ id: "simone_chambers_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "simone_chambers_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Nancy C. Doubleday</a></span>
                          <p>{this.props.intl.formatMessage({ id: "nancy_doubleday_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "nancy_doubleday_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Luciana Duranti</a></span>
                          <p>{this.props.intl.formatMessage({ id: "luciana_duranti_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "luciana_duranti_org_2" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "luciana_duranti_org_3" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">John Dryzek</a></span>
                          <p>{this.props.intl.formatMessage({ id: "john_dryzek_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "john_dryzek_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Amber Frid-Jimenez</a></span>
                          <p>{this.props.intl.formatMessage({ id: "amber_frid_org_1a" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "amber_frid_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Archon Fung</a></span>
                          <p>{this.props.intl.formatMessage({ id: "archon_fung_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "archon_fung_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">John Gastil</a></span>
                          <p>{this.props.intl.formatMessage({ id: "john_gastil_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "john_gastil_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">John Gaventa</a></span>
                          <p>{this.props.intl.formatMessage({ id: "john_gaventa_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "john_gaventa_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Baogang He</a></span>
                          <p>{this.props.intl.formatMessage({ id: "baogang_he_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "baogang_he_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Bonny Ibhawoh</a></span>
                          <p>{this.props.intl.formatMessage({ id: "bonny_ibhawoh_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "bonny_ibhawoh_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Jan-Hendrik Kamlage</a></span>
                          <p>{this.props.intl.formatMessage({ id: "jan_kamlage_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "jan_kamlage_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Paul Kingston</a></span>
                          <p>{this.props.intl.formatMessage({ id: "paul_kingston_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "paul_kingston_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Rodolfo Lewanski</a></span>
                          <p>{this.props.intl.formatMessage({ id: "rodolfo_lewanski_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "rodolfo_lewanski_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Peter Loewen</a></span>
                          <p>{this.props.intl.formatMessage({ id: "peter_loewen_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "peter_loewen_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Françoise Montambeaul</a></span>
                          <p>{this.props.intl.formatMessage({ id: "françoise_montambeault_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "françoise_montambeault_org_2" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "françoise_montambeault_org_3" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Tina Nabatchi</a></span>
                          <p>{this.props.intl.formatMessage({ id: "tina_nabatchi_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "tina_nabatchi_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Patrizia Nanz</a></span>
                          <p>{this.props.intl.formatMessage({ id: "patrizia_nanz_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "patrizia_nanz_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Laurence Piper</a></span>
                          <p>{this.props.intl.formatMessage({ id: "laurence_piper_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "laurence_piper_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Graham Smith</a></span>
                          <p>{this.props.intl.formatMessage({ id: "graham_smith_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "graham_smith_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Dietlind Stolle</a></span>
                          <p>{this.props.intl.formatMessage({ id: "dietlind_stolle_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "dietlind_stolle_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Dietlind Stolle</a></span>
                          <p>{this.props.intl.formatMessage({ id: "dietlind_stolle_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "dietlind_stolle_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Bettina von Lieres</a></span>
                          <p>{this.props.intl.formatMessage({ id: "bettina_von_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "bettina_von_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">June Webber</a></span>
                          <p>{this.props.intl.formatMessage({ id: "june_webber_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "june_webber_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Melissa Williams</a></span>
                          <p>{this.props.intl.formatMessage({ id: "melissa_williams_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "melissa_williams_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Jirong Yan</a></span>
                          <p>{this.props.intl.formatMessage({ id: "jirong_yan_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "jirong_yan_org_2" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "jirong_yan_org_3" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Xiaojin Zhang</a></span>
                          <p>{this.props.intl.formatMessage({ id: "xiaojin_zhang_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "xiaojin_zhang_org_2" })}</p>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab
                      title={this.props.intl.formatMessage({
                        id: "collaborators"
                      })}>
                      <div className="sub-content">
                        <div className="person">
                          <span className="name"><a href="#">André Bächtiger</a></span>
                          <p>{this.props.intl.formatMessage({ id: "andre_bachtiger_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "andre_bachtiger_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Kaustuv Bandyopadhyay</a></span>
                          <p>{this.props.intl.formatMessage({ id: "kaustuv_bandyopadhyay_org_1" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Claudia Feres Faria</a></span>
                          <p>{this.props.intl.formatMessage({ id: "claudia_feres_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "claudia_feres_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Dustin Garrick</a></span>
                          <p>{this.props.intl.formatMessage({ id: "dustin_garrick_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "dustin_garrick_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Katherine Gillieson</a></span>
                          <p>{this.props.intl.formatMessage({ id: "katherine_gillieson_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "katherine_gillieson_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Jez Hall</a></span>
                          <p>{this.props.intl.formatMessage({ id: "jez_hall_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "jez_hall_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Sandy Heierbacher</a></span>
                          <p>{this.props.intl.formatMessage({ id: "sandy_heierbacher_org" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "sandy_heierbacher_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">David Hume</a></span>
                          <p>{this.props.intl.formatMessage({ id: "david_hume_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "david_hume_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">David Kahane</a></span>
                          <p>{this.props.intl.formatMessage({ id: "david_kahane_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "david_kahane_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Katie Knobloch</a></span>
                          <p>{this.props.intl.formatMessage({ id: "katie_knobloch_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "katie_knobloch_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Julien Landry</a></span>
                          <p>{this.props.intl.formatMessage({ id: "julien_landry_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "julien_landry_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Matt Leighninger</a></span>
                          <p>{this.props.intl.formatMessage({ id: "matt_leighninger_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "matt_leighninger_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Michael MacKenzie</a></span>
                          <p>{this.props.intl.formatMessage({ id: "michael_mackenzie_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "michael_mackenzie_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Marjorie Correa Marona</a></span>
                          <p>{this.props.intl.formatMessage({ id: "marjorie_correa_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "marjorie_correa_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Ricardo Fabrino Mendonça</a></span>
                          <p>{this.props.intl.formatMessage({ id: "ricardo_mendonca_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "ricardo_mendonca_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Tiago Peixoto</a></span>
                          <p>{this.props.intl.formatMessage({ id: "tiago_peixoto_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "tiago_peixoto_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Marcus Abílio Gomes Pereira</a></span>
                          <p>{this.props.intl.formatMessage({ id: "marcus_gomes_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "marcus_gomes_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Matthew Ryan</a></span>
                          <p>{this.props.intl.formatMessage({ id: "matthew_ryan_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "matthew_ryan_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Hollie Russon-Gilman</a></span>
                          <p>{this.props.intl.formatMessage({ id: "hollie_russon_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "hollie_russon_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Alexandra Samuel</a></span>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Eleonora Schettini Cunha</a></span>
                          <p>{this.props.intl.formatMessage({ id: "eleonora_schettini_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "eleonora_schettini_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Eduardo Moreira da Silva</a></span>
                          <p>{this.props.intl.formatMessage({ id: "eduardo_moreira_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "eduardo_moreira_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Leonardo Barros Soares</a></span>
                          <p>{this.props.intl.formatMessage({ id: "leonardo_barros_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "leonardo_barros_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Paolo Spada</a></span>
                          <p>{this.props.intl.formatMessage({ id: "paolo_spada_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "paolo_spada_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Joanna Wilson</a></span>
                          <p>{this.props.intl.formatMessage({ id: "joanna_wilson_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "joanna_wilson_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Changdong Zhang</a></span>
                          <p>{this.props.intl.formatMessage({ id: "changdong_zhang_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "changdong_zhang_org_2" })}</p>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab
                      title={this.props.intl.formatMessage({
                        id: "organizations"
                      })}>
                      <div className="sub-content">
                        <div className="person">
                          <span className="name"><a href="#">University of British Columbia</a></span>
                          <p>{this.props.intl.formatMessage({ id: "ubc_dept" })}</p>
                          <p>Vancouver, Canada</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Coady International Institute</a></span>
                          <p>St. Francis Xavier University</p>
                          <p>Antigonish, Canada</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Deliberative Democracy Consortium</a></span>
                          <p>Washington, DC</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Emily Carr University of Art + Design</a></span>
                          <p>{this.props.intl.formatMessage({ id: "ecuad_dept" })}</p>
                          <p>Vancouver, Canada</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Harvard University</a></span>
                          <p>{this.props.intl.formatMessage({ id: "harvard_dept" })}</p>
                          <p>Cambridge, Massachusetts</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "international_observatory" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "int_observatory_location" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "kwi" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "kwi_location" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "mcgill" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "mcgill_dept" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "mcgill_location" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "mcmaster" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "mcmaster_dept" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "mcmaster_location" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "nanyang" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "nanyang_dept" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "nanyang_location" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "national_coalition" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "national_coalition_dept" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "national_coalition_location" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "peking" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "peking_dept" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "peking_location" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "pennsylvania_su" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "pennsylvania_su_dept" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "pennsylvania_su_location" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "app" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "app_dept" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "app_location" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "syracuse" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "syracuse_dept" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "syracuse_location" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "tsinghua" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "tsinghua_dept" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "tsinghua_location" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "coimbra" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "coimbra_dept" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "coimbra_location" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "minas_gerais" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "minas_gerais_dept" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "minas_gerais_location" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "u_alberta" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "u_alberta_dept" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "u_alberta_location" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "u_bologna" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "u_bologna_dept" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "u_bologna_location" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "ubc" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "ubc_dept_1" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "ubc" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "ubc_dept_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "u_canberra" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "u_canberra_dept" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "u_canberra_location" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "u_montreal" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "u_montreal_dept" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "u_montreal_location" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "u_southampton" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "u_southampton_dept" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "u_toronto" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "u_toronto_dept" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "u_toronto_loc" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "u_toronto_s" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "u_toronto_s_dept" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "u_toronto_loc" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "u_western_cape" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "u_western_cape_dept" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "u_western_cape_location" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "u_westminster" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "u_westminster_dept" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "u_westminster_location" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">{this.props.intl.formatMessage({ id: "wbi" })}</a></span>
                          <p>{this.props.intl.formatMessage({ id: "wbi_dept" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "wbi_location" })}</p>
                        </div>
  
                      </div>
                    </AccordionTab>
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab
                title={this.props.intl.formatMessage({ id: "committees" })}>
                <div className="content">
                  <p className="text">
                    {this.props.intl.formatMessage({ id: "committees_intro" })}
                  </p>
                  <div className="sub-accordion">
                    <AccordionTab
                      title={this.props.intl.formatMessage({
                        id: "executive_committee"
                      })}>
                      <div className="sub-content">
                        <FormattedMessage
                          id="executive_committee_intro"
                          values={{ sshrcLink }}
                        />
                        <div className="person">
                          <span className="name"><a href="#">Marco Adria</a>,&nbsp;{this.props.intl.formatMessage({ id: "marco_adria_title" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "marco_adria_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "marco_adria_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Amber Frid-Jimenez</a>,&nbsp;{this.props.intl.formatMessage({ id: "amber_frid_title" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "amber_frid_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "amber_frid_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Archon Fung</a>,&nbsp;{this.props.intl.formatMessage({ id: "archon_fung_title" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "archon_fung_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "archon_fung_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Patrick L. Scully</a>,&nbsp;{this.props.intl.formatMessage({ id: "pat_scully_title" })}</span>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Graham Smith</a>,&nbsp;{this.props.intl.formatMessage({ id: "graham_smith_title" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "graham_smith_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "graham_smith_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Bettina Von Lieres</a>,&nbsp;{this.props.intl.formatMessage({ id: "bettina_von_title" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "bettina_von_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "bettina_von_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Mark E. Warren</a>,&nbsp;{this.props.intl.formatMessage({ id: "mark_warren_title" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "mark_warren_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "mark_warren_org_2" })}</p>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab
                      title={this.props.intl.formatMessage({
                        id: "dt_committee"
                      })}>
                      <div className="sub-content">
                        <p className="text">
                          {this.props.intl.formatMessage({ id: "dt_committee_intro" })}
                        </p>
                        <div className="person">
                          <span className="name"><a href="#">David Ascher</a>,&nbsp;{this.props.intl.formatMessage({ id: "david_ascher_title_2" })}</span>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Jesi Carson</a>,&nbsp;{this.props.intl.formatMessage({ id: "jesi_carson_title" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "jesi_carson_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "jesi_carson_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Andrea Del Rio</a>,&nbsp;{this.props.intl.formatMessage({ id: "andrea_delrio_title" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "andrea_delrio_org" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Dethe Elza</a>,&nbsp;{this.props.intl.formatMessage({ id: "dethe_elza_title" })}</span>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Amber Frid-Jimenez</a>,&nbsp;{this.props.intl.formatMessage({ id: "amber_frid_title_2" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "amber_frid_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "amber_frid_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Sam Jiang</a>,&nbsp;{this.props.intl.formatMessage({ id: "sam_jiang_title" })}</span>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab
                      title={this.props.intl.formatMessage({
                        id: "communications_knowledge_committee"
                      })}>
                      <div className="sub-content">
                        <p className="text">
                          {this.props.intl.formatMessage({ id: "comms_know_intro" })}
                        </p>
                        <div className="person">
                          <span className="name"><a href="#">Marco Adria</a>,&nbsp;{this.props.intl.formatMessage({ id: "marco_adria_title" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "marco_adria_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "marco_adria_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Jesi Carson</a>,&nbsp;{this.props.intl.formatMessage({ id: "jesi_carson_title" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "jesi_carson_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "jesi_carson_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Sandy Heierbacher</a>,&nbsp;{this.props.intl.formatMessage({ id: "sandy_heierbacher_title" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "sandy_heierbacher_org" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Matt Leighninger</a>,&nbsp;{this.props.intl.formatMessage({ id: "matt_leighninger_title" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "matt_leighninger_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "matt_leighninger_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Paolo Spada</a>,&nbsp;{this.props.intl.formatMessage({ id: "paolo_spada_title" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "paolo_spada_org" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Secchi Michelangelo</a>,&nbsp;{this.props.intl.formatMessage({ id: "secchi_michelangelo_title" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "secchi_michelangelo_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "secchi_michelangelo_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Scott Fletcher</a>,&nbsp;{this.props.intl.formatMessage({ id: "scott_fletcher_title" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "scott_fletcher_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "scott_fletcher_org_2" })}</p>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab
                      title={this.props.intl.formatMessage({
                        id: "teaching_training_committee"
                      })}
                    >
                      <div className="sub-content">
                        <p className="text">
                          {this.props.intl.formatMessage({ id: "teaching_training_committee_intro" })}
                        </p>
                        <div className="person">
                          <span className="name"><a href="#">Joanna Ashworth</a>,&nbsp;{this.props.intl.formatMessage({ id: "co_investigator" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "joanna_ashworth_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "joanna_ashworth_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Bonny Ibhawoh</a>,&nbsp;{this.props.intl.formatMessage({ id: "co_investigator" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "bonny_ibhawoh_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "bonny_ibhawoh_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Katie Knobloch</a>,&nbsp;{this.props.intl.formatMessage({ id: "collaborator" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "katie_knobloch_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "katie_knobloch_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Julien Landry</a>,&nbsp;{this.props.intl.formatMessage({ id: "collaborator" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "julien_landry_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "julien_landry_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Marjorie Correa Marona</a>,&nbsp;{this.props.intl.formatMessage({ id: "collaborator" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "marjorie_correa_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "marjorie_correa_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Françoise Montambeaul</a>,&nbsp;{this.props.intl.formatMessage({ id: "co_investigator" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "françoise_montambeault_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "françoise_montambeault_org_2" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "françoise_montambeault_org_3" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Tina Nabatchi</a>,&nbsp;{this.props.intl.formatMessage({ id: "co_investigator" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "tina_nabatchi_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "tina_nabatchi_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Laurence Piper</a>,&nbsp;{this.props.intl.formatMessage({ id: "co_investigator" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "laurence_piper_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "laurence_piper_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Matthew Ryan</a></span>
                          <p>{this.props.intl.formatMessage({ id: "matthew_ryan_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "matthew_ryan_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Timothy Shaffer</a></span>
                          <p>{this.props.intl.formatMessage({ id: "timothy_shaffer_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "timothy_shaffer_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Nancy Thomas</a></span>
                          <p>{this.props.intl.formatMessage({ id: "nancy_thomas_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "nancy_thomas_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Bettina von Lieres</a>,&nbsp;{this.props.intl.formatMessage({ id: "co_investigator" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "bettina_von_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "bettina_von_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Ethan Way</a>,&nbsp;{this.props.intl.formatMessage({ id: "ethan_way_title" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "ethan_way_org_1" })}</p>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab
                      title={this.props.intl.formatMessage({
                        id: "research_design_committee"
                      })}
                    >
                      <div className="sub-content">
                        <p className="text">
                          {this.props.intl.formatMessage({ id: "research_design_committee_intro" })}
                        </p>
                        <div className="person">
                          <span className="name"><a href="#">Leonardo Avritzer</a>,&nbsp;{this.props.intl.formatMessage({ id: "co_investigator" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "leonardo_avritzer_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Selen Ercan</a></span>
                          <p>{this.props.intl.formatMessage({ id: "selen_ercan_org_1" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Matt Leighninger</a>,&nbsp;{this.props.intl.formatMessage({ id: "collaborator" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "matt_leighninger_org_3" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Peter Loewen</a>,&nbsp;{this.props.intl.formatMessage({ id: "co_investigator" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "peter_loewen_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Michael MacKenzie</a></span>
                          <p>{this.props.intl.formatMessage({ id: "michael_mackenzie_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Patrizia Nanz</a></span>
                          <p>{this.props.intl.formatMessage({ id: "patrizia_nanz_org_3" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Lucy Parry</a>,&nbsp;{this.props.intl.formatMessage({ id: "ra" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "lucy_parry_org_1" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Matthew Ryan</a>,&nbsp;{this.props.intl.formatMessage({ id: "collaborator" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "matthew_ryan_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Graham Smith</a>,&nbsp;{this.props.intl.formatMessage({ id: "co_investigator" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "graham_smith_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Dietlind Stolle</a></span>
                          <p>{this.props.intl.formatMessage({ id: "dietlind_stolle_org_2" })}</p>
                        </div>
                        <div className="person">
                          <span className="name"><a href="#">Mark E. Warren</a>,&nbsp;{this.props.intl.formatMessage({ id: "mark_warren_title" })}</span>
                          <p>{this.props.intl.formatMessage({ id: "mark_warren_org_1" })}</p>
                          <p>{this.props.intl.formatMessage({ id: "mark_warren_org_2" })}</p>
                        </div>
                      </div>
                    </AccordionTab>
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab
                title={this.props.intl.formatMessage({ id: "funders" })}>
                <div className="content">
                  <FormattedMessage
                    id="funders_intro"
                    values={{ sshrcLink2, bertelsmannLink }}
                  />
                </div>
              </AccordionTab>
              <AccordionTab
                title={this.props.intl.formatMessage({ id: "staff" })}>
                <div className="content">
                  <p className="text">
                    {this.props.intl.formatMessage({ id: "staff_intro" })}
                  </p>
                  <div className="person">
                    <span className="name"><a href="#">David Ascher</a>,&nbsp;{this.props.intl.formatMessage({ id: "david_ascher_title" })}</span>
                  </div>
                  <div className="person">
                    <span className="name"><a href="#">Jesi Carson</a>,&nbsp;{this.props.intl.formatMessage({ id: "jesi_carson_title" })}</span>
                    <p>{this.props.intl.formatMessage({ id: "jesi_carson_org_2" })}</p>
                  </div>
                  <div className="person">
                    <span className="name"><a href="#">Rebecca Monnerat</a>,&nbsp;{this.props.intl.formatMessage({ id: "rebecca_monnerat_title" })}</span>
                    <p>{this.props.intl.formatMessage({ id: "rebecca_monnerat_org" })}</p>
                  </div>
                  <div className="person">
                    <span className="name"><a href="#">Patrick L. Scully</a>,&nbsp;{this.props.intl.formatMessage({ id: "pat_scully_title" })}</span>
                  </div>
                  <div className="person">
                    <span className="name"><a href="#">Mark E. Warren</a>,&nbsp;{this.props.intl.formatMessage({ id: "mark_warren_title" })}</span>
                    <p>{this.props.intl.formatMessage({ id: "mark_warren_org_1" })}</p>
                    <p>{this.props.intl.formatMessage({ id: "mark_warren_org_2" })}</p>
                  </div>
                </div>
              </AccordionTab>
            </div>
            <h2>{this.props.intl.formatMessage({ id: "content" })}</h2>
            <div className="text">
              {this.props.intl.formatMessage({ id: "content_intro" })}
            </div>
            <div className="accordion">
              <AccordionTab
                title={this.props.intl.formatMessage({ id: "cases" })}
              >
                <div className="content">
                  <p className="text">
                    {this.props.intl.formatMessage({ id: "cases_content" })}
                  </p>
                </div>
              </AccordionTab>
              <AccordionTab
                title={this.props.intl.formatMessage({ id: "methods" })}
              >
                <div className="content">
                  <p className="text">
                    {this.props.intl.formatMessage({ id: "methods_content" })}
                  </p>
                </div>
              </AccordionTab>
              <AccordionTab
                title={this.props.intl.formatMessage({ id: "organizations" })}
              >
                <div className="content">
                  <p className="text">
                    {this.props.intl.formatMessage({
                      id: "organizations_content"
                    })}
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

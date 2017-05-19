import React from "react"; // eslint-disable-line no-unused-vars
import { Container, Row, Col } from "reactstrap";
import AccordionTab from "./components/AccordionTab/AccordionTab";
import "./About.css";
import "./StaticPages.css";
import { Link } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";

class About extends React.Component {
  render() {
    const communityLink = (
      <Link to="http://participedia.net/en/user/register">
        {this.props.intl.formatMessage({ id: "join_community" })}
      </Link>
    );
    const ccLink = (
      <Link to="http://creativecommons.org/licenses/by-nc-sa/3.0/">
        {this.props.intl.formatMessage({ id: "creative_commons" })}
      </Link>
    );
    const caseLink = (
      <Link to="http://participedia.net/en/browse/cases">
        {this.props.intl.formatMessage({ id: "cases" })}
      </Link>
    );
    const methodLink = (
      <Link to="http://participedia.net/en/browse/methods">
        {this.props.intl.formatMessage({ id: "methods" })}
      </Link>
    );
    const orgLink = (
      <Link to="http://participedia.net/en/browse/organizations">
        {this.props.intl.formatMessage({ id: "organizations" })}
      </Link>
    );
    const publishLink = (
      <Link to="http://participedia.net/en/create-content">
        {this.props.intl.formatMessage({ id: "publishing" })}
      </Link>
    );
    const teachLink = (
      <Link to="http://participedia.net/content/assign-participedia-classroom">
        {this.props.intl.formatMessage({ id: "teach_link" })}
      </Link>
    );
    const sshrcLink = (
      <Link to="http://www.bfna.org/">
        {this.props.intl.formatMessage({ id: "sshrc_grant" })}
      </Link>
    );
    const sshrcLink2 = (
      <Link to="http://www.sshrc-crsh.gc.ca/home-accueil-eng.aspx">
        {this.props.intl.formatMessage({ id: "sshrc" })}
      </Link>
    );
    const bertelsmannLink = (
      <Link to="http://www.sshrc-crsh.gc.ca/home-accueil-eng.aspx">
        {this.props.intl.formatMessage({ id: "bertelsmann_foundation" })}
      </Link>
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
            <h6 className="sub-head pt-1">
              {this.props.intl.formatMessage({ id: "explore" })}
            </h6>
            <FormattedMessage
              id="explore_intro"
              values={{ caseLink, methodLink, orgLink }}
            />
            <h6 className="sub-head pt-1">
              {this.props.intl.formatMessage({ id: "contribute" })}
            </h6>
            <FormattedMessage id="contribute_intro" values={{ publishLink }} />
            <h6 className="sub-head pt-1">
              {this.props.intl.formatMessage({ id: "teach" })}
            </h6>
            <FormattedMessage id="teach_intro" values={{ teachLink }} />
            <h2>{this.props.intl.formatMessage({ id: "community" })}</h2>
            <p className="pb-1">
              {this.props.intl.formatMessage({ id: "community_text_1" })}
            </p>
            <p>{this.props.intl.formatMessage({ id: "community_text_2" })}</p>
            <div className="accordion">
              <AccordionTab
                title={this.props.intl.formatMessage({ id: "members" })}
              >
                <div className="content">
                  <p className="text pb-1">
                    {this.props.intl.formatMessage({ id: "members_intro" })}
                  </p>
                  <Link to="http://participedia.net/en/user/register">
                    {this.props.intl.formatMessage({ id: "join_now" })}
                  </Link>
                </div>
              </AccordionTab>
              <AccordionTab
                title={this.props.intl.formatMessage({ id: "partners" })}
              >
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
                          <span className="name">
                            Mark E. Warren,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "mark_warren_title"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "mark_warren_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "mark_warren_org_2"
                            })}
                          </p>
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
                          <span className="name">Julia Abelson</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "julia_abelson_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "julia_abelson_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Marco Adria</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "marco_adria_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "marco_adria_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Giovanni Allegretti</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "giovanni_allegretti_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "giovanni_allegretti_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Joanna Ashworth</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "joanna_ashworth_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "joanna_ashworth_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Leonardo Avritzer</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "leonardo_avritzer_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "leonardo_avritzer_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Michael Burgess</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "michael_burgess_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "michael_burgess_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Simone Chambers</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "simone_chambers_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "simone_chambers_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Nancy C. Doubleday</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "nancy_doubleday_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "nancy_doubleday_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Luciana Duranti</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "luciana_duranti_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "luciana_duranti_org_2"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "luciana_duranti_org_3"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">John Dryzek</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "john_dryzek_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "john_dryzek_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Amber Frid-Jimenez</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "amber_frid_org_1a"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "amber_frid_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Archon Fung</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "archon_fung_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "archon_fung_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">John Gastil</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "john_gastil_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "john_gastil_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">John Gaventa</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "john_gaventa_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "john_gaventa_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Baogang He</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "baogang_he_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "baogang_he_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Bonny Ibhawoh</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "bonny_ibhawoh_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "bonny_ibhawoh_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Jan-Hendrik Kamlage</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "jan_kamlage_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "jan_kamlage_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Paul Kingston</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "paul_kingston_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "paul_kingston_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Rodolfo Lewanski</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "rodolfo_lewanski_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "rodolfo_lewanski_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Peter Loewen</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "peter_loewen_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "peter_loewen_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Françoise Montambeaul</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "françoise_montambeault_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "françoise_montambeault_org_2"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "françoise_montambeault_org_3"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Tina Nabatchi</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "tina_nabatchi_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "tina_nabatchi_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Patrizia Nanz</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "patrizia_nanz_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "patrizia_nanz_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Laurence Piper</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "laurence_piper_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "laurence_piper_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Graham Smith</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "graham_smith_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "graham_smith_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Dietlind Stolle</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "dietlind_stolle_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "dietlind_stolle_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Dietlind Stolle</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "dietlind_stolle_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "dietlind_stolle_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Bettina von Lieres</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "bettina_von_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "bettina_von_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">June Webber</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "june_webber_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "june_webber_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Melissa Williams</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "melissa_williams_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "melissa_williams_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Jirong Yan</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "jirong_yan_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "jirong_yan_org_2"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "jirong_yan_org_3"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Xiaojin Zhang</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "xiaojin_zhang_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "xiaojin_zhang_org_2"
                            })}
                          </p>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab
                      title={this.props.intl.formatMessage({
                        id: "collaborators"
                      })}
                    >
                      <div className="sub-content">
                        <div className="person">
                          <span className="name">André Bächtiger</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "andre_bachtiger_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "andre_bachtiger_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Kaustuv Bandyopadhyay</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "kaustuv_bandyopadhyay_org_1"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Claudia Feres Faria</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "claudia_feres_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "claudia_feres_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Dustin Garrick</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "dustin_garrick_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "dustin_garrick_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Katherine Gillieson</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "katherine_gillieson_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "katherine_gillieson_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Jez Hall</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "jez_hall_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "jez_hall_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Sandy Heierbacher</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "sandy_heierbacher_org"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "sandy_heierbacher_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">David Hume</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "david_hume_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "david_hume_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">David Kahane</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "david_kahane_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "david_kahane_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Katie Knobloch</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "katie_knobloch_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "katie_knobloch_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Julien Landry</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "julien_landry_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "julien_landry_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Matt Leighninger</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "matt_leighninger_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "matt_leighninger_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Michael MacKenzie</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "michael_mackenzie_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "michael_mackenzie_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Marjorie Correa Marona</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "marjorie_correa_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "marjorie_correa_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Ricardo Fabrino Mendonça</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "ricardo_mendonca_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "ricardo_mendonca_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Tiago Peixoto</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "tiago_peixoto_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "tiago_peixoto_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Marcus Abílio Gomes Pereira
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "marcus_gomes_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "marcus_gomes_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Matthew Ryan</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "matthew_ryan_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "matthew_ryan_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Hollie Russon-Gilman</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "hollie_russon_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "hollie_russon_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Alexandra Samuel</span>
                        </div>
                        <div className="person">
                          <span className="name">Eleonora Schettini Cunha</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "eleonora_schettini_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "eleonora_schettini_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Eduardo Moreira da Silva</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "eduardo_moreira_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "eduardo_moreira_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Leonardo Barros Soares</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "leonardo_barros_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "leonardo_barros_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Paolo Spada</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "paolo_spada_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "paolo_spada_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Joanna Wilson</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "joanna_wilson_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "joanna_wilson_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Changdong Zhang</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "changdong_zhang_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "changdong_zhang_org_2"
                            })}
                          </p>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab
                      title={this.props.intl.formatMessage({
                        id: "organizations"
                      })}
                    >
                      <div className="sub-content">
                        <div className="person">
                          <span className="name">
                            University of British Columbia
                          </span>
                          <p>
                            {this.props.intl.formatMessage({ id: "ubc_dept" })}
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
                            {this.props.intl.formatMessage({
                              id: "ecuad_dept"
                            })}
                          </p>
                          <p>Vancouver, Canada</p>
                        </div>
                        <div className="person">
                          <span className="name">Harvard University</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "harvard_dept"
                            })}
                          </p>
                          <p>Cambridge, Massachusetts</p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({
                              id: "international_observatory"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "int_observatory_location"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({ id: "kwi" })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "kwi_location"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({ id: "mcgill" })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "mcgill_dept"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "mcgill_location"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({ id: "mcmaster" })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "mcmaster_dept"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "mcmaster_location"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({ id: "nanyang" })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "nanyang_dept"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "nanyang_location"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({
                              id: "national_coalition"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "national_coalition_dept"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "national_coalition_location"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({ id: "peking" })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "peking_dept"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "peking_location"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({
                              id: "pennsylvania_su"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "pennsylvania_su_dept"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "pennsylvania_su_location"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({ id: "app" })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({ id: "app_dept" })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "app_location"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({ id: "syracuse" })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "syracuse_dept"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "syracuse_location"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({ id: "tsinghua" })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "tsinghua_dept"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "tsinghua_location"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({ id: "coimbra" })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "coimbra_dept"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "coimbra_location"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({
                              id: "minas_gerais"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "minas_gerais_dept"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "minas_gerais_location"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({ id: "u_alberta" })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "u_alberta_dept"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "u_alberta_location"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({ id: "u_bologna" })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "u_bologna_dept"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "u_bologna_location"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({ id: "ubc" })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "ubc_dept_1"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({ id: "ubc" })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "ubc_dept_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({
                              id: "u_canberra"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "u_canberra_dept"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "u_canberra_location"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({
                              id: "u_montreal"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "u_montreal_dept"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "u_montreal_location"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({
                              id: "u_southampton"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "u_southampton_dept"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({ id: "u_toronto" })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "u_toronto_dept"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "u_toronto_loc"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({
                              id: "u_toronto_s"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "u_toronto_s_dept"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "u_toronto_loc"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({
                              id: "u_western_cape"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "u_western_cape_dept"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "u_western_cape_location"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({
                              id: "u_westminster"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "u_westminster_dept"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "u_westminster_location"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            {this.props.intl.formatMessage({ id: "wbi" })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({ id: "wbi_dept" })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "wbi_location"
                            })}
                          </p>
                        </div>

                      </div>
                    </AccordionTab>
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab
                title={this.props.intl.formatMessage({ id: "committees" })}
              >
                <div className="content">
                  <p className="text">
                    {this.props.intl.formatMessage({ id: "committees_intro" })}
                  </p>
                  <div className="sub-accordion">
                    <AccordionTab
                      title={this.props.intl.formatMessage({
                        id: "executive_committee"
                      })}
                    >
                      <div className="sub-content">
                        <FormattedMessage
                          id="executive_committee_intro"
                          values={{ sshrcLink }}
                        />
                        <div className="person">
                          <span className="name">
                            Marco Adria,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "marco_adria_title"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "marco_adria_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "marco_adria_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Amber Frid-Jimenez,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "amber_frid_title"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "amber_frid_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "amber_frid_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Archon Fung,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "archon_fung_title"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "archon_fung_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "archon_fung_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Patrick L. Scully,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "pat_scully_title"
                            })}
                          </span>
                        </div>
                        <div className="person">
                          <span className="name">
                            Graham Smith,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "graham_smith_title"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "graham_smith_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "graham_smith_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Bettina Von Lieres,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "bettina_von_title"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "bettina_von_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "bettina_von_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Mark E. Warren,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "mark_warren_title"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "mark_warren_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "mark_warren_org_2"
                            })}
                          </p>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab
                      title={this.props.intl.formatMessage({
                        id: "dt_committee"
                      })}
                    >
                      <div className="sub-content">
                        <p className="text">
                          {this.props.intl.formatMessage({
                            id: "dt_committee_intro"
                          })}
                        </p>
                        <div className="person">
                          <span className="name">
                            David Ascher,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "david_ascher_title_2"
                            })}
                          </span>
                        </div>
                        <div className="person">
                          <span className="name">
                            Jesi Carson,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "jesi_carson_title"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "jesi_carson_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "jesi_carson_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Andrea Del Rio,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "andrea_delrio_title"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "andrea_delrio_org"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Dethe Elza,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "dethe_elza_title"
                            })}
                          </span>
                        </div>
                        <div className="person">
                          <span className="name">
                            Amber Frid-Jimenez,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "amber_frid_title_2"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "amber_frid_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "amber_frid_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Sam Jiang,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "sam_jiang_title"
                            })}
                          </span>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab
                      title={this.props.intl.formatMessage({
                        id: "communications_knowledge_committee"
                      })}
                    >
                      <div className="sub-content">
                        <p className="text">
                          {this.props.intl.formatMessage({
                            id: "comms_know_intro"
                          })}
                        </p>
                        <div className="person">
                          <span className="name">
                            Marco Adria,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "marco_adria_title"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "marco_adria_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "marco_adria_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Jesi Carson,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "jesi_carson_title"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "jesi_carson_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "jesi_carson_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Sandy Heierbacher,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "sandy_heierbacher_title"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "sandy_heierbacher_org"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Matt Leighninger,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "matt_leighninger_title"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "matt_leighninger_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "matt_leighninger_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Paolo Spada,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "paolo_spada_title"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "paolo_spada_org"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Secchi Michelangelo,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "secchi_michelangelo_title"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "secchi_michelangelo_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "secchi_michelangelo_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Scott Fletcher,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "scott_fletcher_title"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "scott_fletcher_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "scott_fletcher_org_2"
                            })}
                          </p>
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
                          {this.props.intl.formatMessage({
                            id: "teaching_training_committee_intro"
                          })}
                        </p>
                        <div className="person">
                          <span className="name">
                            Joanna Ashworth,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "co_investigator"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "joanna_ashworth_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "joanna_ashworth_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Bonny Ibhawoh,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "co_investigator"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "bonny_ibhawoh_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "bonny_ibhawoh_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Katie Knobloch,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "collaborator"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "katie_knobloch_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "katie_knobloch_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Julien Landry,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "collaborator"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "julien_landry_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "julien_landry_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Marjorie Correa Marona,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "collaborator"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "marjorie_correa_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "marjorie_correa_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Françoise Montambeaul,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "co_investigator"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "françoise_montambeault_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "françoise_montambeault_org_2"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "françoise_montambeault_org_3"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Tina Nabatchi,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "co_investigator"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "tina_nabatchi_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "tina_nabatchi_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Laurence Piper,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "co_investigator"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "laurence_piper_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "laurence_piper_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Matthew Ryan</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "matthew_ryan_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "matthew_ryan_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Timothy Shaffer</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "timothy_shaffer_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "timothy_shaffer_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Nancy Thomas</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "nancy_thomas_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "nancy_thomas_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Bettina von Lieres,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "co_investigator"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "bettina_von_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "bettina_von_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Ethan Way,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "ethan_way_title"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "ethan_way_org_1"
                            })}
                          </p>
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
                          {this.props.intl.formatMessage({
                            id: "research_design_committee_intro"
                          })}
                        </p>
                        <div className="person">
                          <span className="name">
                            Leonardo Avritzer,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "co_investigator"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "leonardo_avritzer_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Selen Ercan</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "selen_ercan_org_1"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Matt Leighninger,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "collaborator"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "matt_leighninger_org_3"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Peter Loewen,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "co_investigator"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "peter_loewen_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Michael MacKenzie</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "michael_mackenzie_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Patrizia Nanz</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "patrizia_nanz_org_3"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Lucy Parry,&nbsp;
                            {this.props.intl.formatMessage({ id: "ra" })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "lucy_parry_org_1"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Matthew Ryan,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "collaborator"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "matthew_ryan_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Graham Smith,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "co_investigator"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "graham_smith_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">Dietlind Stolle</span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "dietlind_stolle_org_2"
                            })}
                          </p>
                        </div>
                        <div className="person">
                          <span className="name">
                            Mark E. Warren,&nbsp;
                            {this.props.intl.formatMessage({
                              id: "mark_warren_title"
                            })}
                          </span>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "mark_warren_org_1"
                            })}
                          </p>
                          <p>
                            {this.props.intl.formatMessage({
                              id: "mark_warren_org_2"
                            })}
                          </p>
                        </div>
                      </div>
                    </AccordionTab>
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab
                title={this.props.intl.formatMessage({ id: "funders" })}
              >
                <div className="content">
                  <FormattedMessage
                    id="funders_intro"
                    values={{ sshrcLink2, bertelsmannLink }}
                  />
                </div>
              </AccordionTab>
              <AccordionTab
                title={this.props.intl.formatMessage({ id: "staff" })}
              >
                <div className="content">
                  <p className="text">
                    {this.props.intl.formatMessage({ id: "staff_intro" })}
                  </p>
                  <div className="person">
                    <span className="name">
                      David Ascher,&nbsp;
                      {this.props.intl.formatMessage({
                        id: "david_ascher_title"
                      })}
                    </span>
                  </div>
                  <div className="person">
                    <span className="name">
                      Jesi Carson,&nbsp;
                      {this.props.intl.formatMessage({
                        id: "jesi_carson_title"
                      })}
                    </span>
                    <p>
                      {this.props.intl.formatMessage({
                        id: "jesi_carson_org_2"
                      })}
                    </p>
                  </div>
                  <div className="person">
                    <span className="name">
                      Rebecca Monnerat,&nbsp;
                      {this.props.intl.formatMessage({
                        id: "rebecca_monnerat_title"
                      })}
                    </span>
                    <p>
                      {this.props.intl.formatMessage({
                        id: "rebecca_monnerat_org"
                      })}
                    </p>
                  </div>
                  <div className="person">
                    <span className="name">
                      Patrick L. Scully,&nbsp;
                      {this.props.intl.formatMessage({
                        id: "pat_scully_title"
                      })}
                    </span>
                  </div>
                  <div className="person">
                    <span className="name">
                      Mark E. Warren,&nbsp;
                      {this.props.intl.formatMessage({
                        id: "mark_warren_title"
                      })}
                    </span>
                    <p>
                      {this.props.intl.formatMessage({
                        id: "mark_warren_org_1"
                      })}
                    </p>
                    <p>
                      {this.props.intl.formatMessage({
                        id: "mark_warren_org_2"
                      })}
                    </p>
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

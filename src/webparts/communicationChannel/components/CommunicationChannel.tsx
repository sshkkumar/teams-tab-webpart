import * as React from "react";
import styles from "./CommunicationChannel.module.scss";
import { ICommunicationChannelProps } from "./ICommunicationChannelProps";
import { escape } from "@microsoft/sp-lodash-subset";
import User from "./User";

// import Tabs from "react-bootstrap/Tabs";
// import Tab from "react-bootstrap/Tab";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Approver from "./Approver";
import "bootstrap/dist/css/bootstrap.css";
//import { IUserProps } from "./IUserProps";

export default class CommunicationChannel extends React.Component<
  ICommunicationChannelProps,
  {}
> {
  public render(): React.ReactElement<ICommunicationChannelProps> {
    let title: string = "Title";
    let subTitle: string = "Sub Title";
    let siteTabTitle: string = "Shiv Tab";
    console.log("Teams Context: " + this.props.teamsContext);

    if (this.props.teamsContext) {
      // We have teams context for the web part
      title = "Welcome to Teams!";
      subTitle = "Building custom enterprise tabs for your business.";
      siteTabTitle =
        "We are in the context of following Team: " +
        this.props.teamsContext.teamName;
    } else {
      // We are rendered in normal SharePoint context
      title = "Welcome to SharePoint!";
      subTitle = "Customize SharePoint experiences using Web Parts.";
      siteTabTitle = "We are in the context of following site: "; // + this.context.pageContext.web.title;
    }

    return (
      <div>
        <Tabs>
          <TabList>
            <Tab>User</Tab>
            <Tab>Approver</Tab>
          </TabList>

          <TabPanel>
            <User
              teamsContext={this.props.teamsContext}
              spContext={this.props.spContext}
            />
          </TabPanel>
          <TabPanel>
            <Approver />
          </TabPanel>
        </Tabs>
      </div>

      // <div className={styles.communicationChannel}>
      //   <div className={styles.container}>
      //     <div className={styles.row}>
      //       <div className={styles.column}>
      //         <span className={styles.title}>{title}</span>
      //         <p className={styles.subTitle}>{subTitle}</p>
      //         <p className={styles.description}>{siteTabTitle}</p>
      //         <p className={styles.description}>
      //           {escape(this.props.description)}
      //         </p>
      //         <a href="https://aka.ms/spfx" className={styles.button}>
      //           <span className={styles.label}>Learn more</span>
      //         </a>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

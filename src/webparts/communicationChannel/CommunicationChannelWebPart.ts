import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-property-pane";

import * as strings from "CommunicationChannelWebPartStrings";
import CommunicationChannel from "./components/CommunicationChannel";
import { ICommunicationChannelProps } from "./components/ICommunicationChannelProps";

import * as microsoftTeams from "@microsoft/teams-js";

export interface ICommunicationChannelWebPartProps {
  description: string;
}

export default class CommunicationChannelWebPart extends BaseClientSideWebPart<
  ICommunicationChannelWebPartProps
> {
  private _teamsContext: microsoftTeams.Context;

  protected onInit(): Promise<any> {
    let retVal: Promise<any> = Promise.resolve();
    if (this.context.microsoftTeams) {
      retVal = new Promise((resolve, reject) => {
        this.context.microsoftTeams.getContext(context => {
          this._teamsContext = context;
          resolve();
        });
      });
    }
    return retVal;
  }

  public render(): void {
    const element: React.ReactElement<
      ICommunicationChannelProps
    > = React.createElement(CommunicationChannel, {
      description: this.properties.description,
      teamsContext: this._teamsContext,
      spContext: this.context
    });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

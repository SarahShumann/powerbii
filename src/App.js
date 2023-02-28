import React from "react";
import React, { useState } from 'react';
import { models, Report, Embed, service, Page } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import 'powerbi-report-authoring';
import "./style.css";

export default class App extends React.Component {
  state = {config:{}}
  async componentDidMount(){
    var reportConfig = await fetch('https://playgroundbe-bck-1.azurewebsites.net/Reports/SampleReport');
		reportConfig = await reportConfig.json();
    let config = {
      type: 'report',
      tokenType: models.TokenType.Embed,
			embedUrl: reportConfig.EmbedUrl,
			accessToken: reportConfig.EmbedToken.Token
		};
    this.mounted = true
    this.setState({config})
  }
  render(){
    if(!this.mounted){return null}
    let {config} = this.state;
    console.log(config)
    return (
    <div>
			<PowerBIEmbed
        style={{height:600}}
				embedConfig={config}
				cssClassName = { "report-style-class" }
				
			/>
    </div>
  );
  }
}

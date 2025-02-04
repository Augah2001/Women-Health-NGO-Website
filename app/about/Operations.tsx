import React from "react";
import OperationsCard from "./OperationCard";

const Operations = () => {
  const operations = [
    {
      heading: "Projects",
      description: [
        "This unit is responsible for collecting data on trends and patterns of drug and substance use, prevalence rates, statistics on arrests and incarceration of those apprehended, treatment and rehabilitation outcomes and other relevant information.",
        "It will establish mechanisms to collect comprehensive and reliable data by partnering with healthcare facilities, rehabilitation centres, law enforcement agencies, community-based organizations and other relevant entities to collect real-time data on drug use patterns.",
        "The unit will have a dedicated team of experts to analyse the collected data and it will produce regular reports highlighting key findings, trends, emerging issues and policy recommendations based on their analysis.",
        "Interested individuals and stakeholders will access all the information related to our specific research topics in just one click.",
        "Each project will be dedicated to a specific theme and holds related IEC materials.",
      ],
    },
    {
      heading: "Reporting",
      description: [
        "The primary publication produced annually by the Drug Observatory is a comprehensive national report or an update on the current drug situation in Zimbabwe.",
        "In addition to the annual report, the Observatory will also conduct ad hoc studies and generate other relevant reports.",
        "A Quarterly Bulletin/Newsletter will be published, providing updates on the gathered information related to drug use in Zimbabwe.",
        "ZCLDN will establish a partnership with a prominent newspaper (media house) to feature weekly reports on our work.",
        "Reports will be shared and disseminated through official channels, including websites, press releases, stakeholder meetings, conferences, and policy briefs.",
      ],
    },
    {
      heading: "Policy Advocacy Unit",
      description: [
        "A critical part of the Drug Observatory is a dedicated unit responsible for translating research findings into practical policy recommendations.",
        "This unit will actively engage with policymakers at different levels to advocate for evidence-based drug policies that prioritize harm reduction strategies and HIV prevention efforts.",
        "The unit will also generate policy briefs and position papers to support its advocacy efforts.",
      ],
    },
    {
      heading: "Capacity Building and Training Division",
      description: [
        "To ensure sustainability and effectiveness, the observatory will collaborate closely with ZCLDN's Programmes Department to build and strengthen the capacity of local stakeholders in best practices and contemporary drug policy and interventions.",
        "Regular training programs will be conducted to enhance the skills of individuals working in the field of drug policy and public health.",
      ],
    },
    {
      heading: "Podcast",
      description: [
        "This unit produces, hosts, and promotes relevant audio and visual content aligned with our core research areas and the related work of the observatory.",
        "The observatory’s multimedia content is designed to advance our commitment to the promotion of evidence and human rights-based drug policy through comprehensive and rigorous reporting, monitoring, and analysis of policy developments at both national and international levels.",
      ],
    },
    {
      heading: "Partnerships",
      description: [
        "To stay up-to-date with global best practices in drug policy and harm reduction, the Drug Observatory will pursue partnerships or affiliations with international institutions that operate Drug Observatories, such as the Zimbabwe Drug Policy Observatory.",
        "The Observatory will contribute to and utilize databases maintained by organizations like the Commission on Narcotic Drugs (CND) and the United Nations Office on Drugs and Crime (UNODC).",
      ],
    },
  ];
  return (
    <div className="pt-16 bg-[#87b791]">
      <h1 className="text-4xl text-center flex justify-center  font-normal text-[#0c3012]">
      Operation of the National Drug Observatory And Background
      </h1>
      <div className="grid px-8 xs:grid-cols-1 gap-8 mt-14 sm:grid-cols-2 lg:grid-cols-3">
        {operations.map((operation, index) => (
          <OperationsCard
            key={index}
            description={operation.description}
            heading={operation.heading}
          />
        ))}
      </div>
    </div>
  );
};

export default Operations;

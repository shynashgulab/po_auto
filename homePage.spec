# Spec for Polaris HomePage
This Spec contains TestScenarios for Polaris HomePage Screen


This is a context step that runs before every scenario 
* Open application when Valid application URL hits
* Homepage Must display
* And Delivery Metrics Panels available

## Validate HomePage Panels available
* And Delivery Metrics header display
* And Delivery Metrics Panels available

## validate default Last 30 days Text appears disabled
* And Delivery Metrics Panels available
* Then Last 30 days must be displayed in date filter

## validate ToolTip/MetricsHeader/Displaydata available in LeadTime custom panel
* Then info icon available for "LeadTime"
* And MetricHeader for "LeadTime" available
* And DisplayData for "LeadTime" available

## validate ToolTip/MetricsHeader/Displaydata available in Deployment Frequency custom panel
* Then info icon available for "DeploymentFrequency"
* And MetricHeader for "DeploymentFrequency" available
* And DisplayData for "DeploymentFrequency" available

## validate ToolTip/MetricsHeader/Displaydata available in BFR custom panel
* Then info icon available for "BuildFailureRate"
* And MetricHeader for "BuildFailureRate" available
* And DisplayData for "BuildFailureRate" available

## validate ToolTip/MetricsHeader/Displaydata available in TechDebt custom panel
* Then info icon available for "TechnicalDebt"
* And MetricHeader for "TechnicalDebt" available
* And DisplayData for "TechnicalDebt" available

## validate ToolTip/MetricsHeader/Displaydata available in Security Warnings custom panel
* Then info icon available for "SecurityWarnings"
* And MetricHeader for "SecurityWarnings" available
* And DisplayData for "SecurityWarnings" available

## validate ToolTip/MetricsHeader/Displaydata available in all chart panels
* Then Yaxis info matches with TestData for "LeadTime"
* Then Yaxis info matches with TestData for "DeploymentFrequency"
* Then Yaxis info matches with TestData for "BuildFailureRate"
* Then Yaxis info matches with TestData for "TechnicalDebt"
* Then Yaxis info matches with TestData for "SecurityWarnings"

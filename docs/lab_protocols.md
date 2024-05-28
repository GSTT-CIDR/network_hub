# Lab Protocols - coming soon

``` mermaid
graph LR
  A[Respiratory sample collection] --> B{Turbid sample?};
  B -->|Yes| C[Centrifuge and collect supernatant.];
  C --> E[Aspirate supernatant];
  B ---->|No| E[Extract DNA];
```
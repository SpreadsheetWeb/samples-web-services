This folder contains Node.js sample client application which makes a [GetResult](https://pagosinc.atlassian.net/wiki/spaces/SSWEB/pages/446791703/GetResult+Application-Level) call to SpreadsheetWeb Web Service Application.

## Folder contents

- *test_calculator.js* - the actual Node.js sample code
- *request.json* - json file containing sample request in a separate file for better sample clarity
- *request_goal_seek.json* - json file containing another sample request (with Goal Seek parameters)

## How to run

1. Install [Node.js](https://nodejs.org)
2. Run the sample. It will connect to [calc.spreadsheetweb.com](https://calc.spreadsheetweb.com) and send the specific request.

    - with simple request
    
        ```bash
        > node test_calculator.js
        
        Outputs:
        DownPayment = 0.1 (text: '10.00%')
        MonthlyPMI = 195 (text: '195.00')
        MonthlyPayment = 2812.11882959454 (text: '2,812.12')
        NbOfPayment = 360 (text: '360')
        PMI = 0.0052 (text: '0.52%')
        TotPayment = 1012362.77865404 (text: '1,012,362.78')
        ```
    
        This will load a *request.json* file and use it as a request when calling SpreadsheetWeb Web Service Application.
        
    - or with the request containing goal seek options:
    
        ```bash
        > node test_calculator.js --goal-seek
        
        Outputs:
        DownPayment = 0.07215625 (text: '7.22%')
        LoanAmount = 463921.875 (text: '463,921.88')
        MonthlyPMI = 301.54921875 (text: '301.55')
        MonthlyPayment = 2999.63516213512 (text: '2,999.64')
        NbOfPayment = 360 (text: '360')
        PMI = 0.0078 (text: '0.78%')
        TotPayment = 1079868.65836864 (text: '1,079,868.66')
        ```
    
        This will load a *request_goal_seek.json* file, which is actually same as the previous one except that it contains an extra goal seek options which will ask the web service to try to pick the specific `LoanAmount` value which will result in `MonthlyPayment` value as close to `3000` as possible:
        
        ```json
        {
            "GoalSeek": {
                "Enabled": true,
                "TargetRef": "MonthlyPayment",
                "ChangingRef": "LoanAmount",
                "TargetValue": 3000,
                "MaxIterations": 1000,
                "MaxChange": 1
            }
        }
        ```
        
from dotenv import load_dotenv
import openai
import json
import easyocr
import os
import pdf2image
import argparse
import sys
import tempfile
import numpy as np
import cv2
import io


load_dotenv()
# OpenAI API Key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")



# Function to extract text from a PDF file
def extract_text_from_pdf(pdf_bytes):
    reader = easyocr.Reader(["en", "mr"])  # English + Marathi support

    # Convert PDF bytes to images
    images = pdf2image.convert_from_bytes(pdf_bytes)

    text_list = []
    for img in images:
        with io.BytesIO() as image_bytes:
            img.save(image_bytes, format="PNG")
            image_bytes.seek(0)

            # Read text from the image
            result = reader.readtext(image_bytes.getvalue(), detail=0)
            text_list.append("\n".join(result))

    return "\n".join(text_list).strip()

# Function to process text using OpenAI API
def convert_text_to_json(text):
    fixed_json_structure = """ 
    {
    "1": {
        "District (जिल्हा)": "VALUE_HERE",
        "FIR No. (प्रथम खबर क्र.)": "VALUE_HERE",
        "P.S. (पोलीस ठाणे)": "VALUE_HERE",
        "Year (वर्ष)": "VALUE_HERE",
        "Date and Time of FIR (प्र. ख. दिनांक आणि वेळ)": "VALUE_HERE"
    },
    "2": {
        "Acts and Sections": [
            {
                "S.No. (अ.क्र.)": "VALUE_HERE",
                "Acts (अधिनियम)": "VALUE_HERE",
                "Sections (कलम)": "VALUE_HERE"
            }
        ]
    },
    "3": {
        "Occurrence of offence (गुन्हयाची घटना)": {
            "Day (दिवस)": "VALUE_HERE",
            "Date from (दिनांक पासून)": "VALUE_HERE",
            "Date To (दिनांक पर्यंत)": "VALUE_HERE",
            "Time Period (कालावधी)": {
                "Time From (वेळेपासून)": "VALUE_HERE",
                "Time To (वेळेपर्यंत)": "VALUE_HERE"
            }
        },
        "Information received at P.S. (पोलीस ठाण्यावर माहिती मिळाल्याचा)": {
            "Date (दिनांक)": "VALUE_HERE",
            "Time (वेळ)": "VALUE_HERE"
        },
        "General Diary Reference (ठाणे दैनंदिनी संदर्भ)": {
            "Entry No. (नोंद क्र.)": "VALUE_HERE",
            "Date and Time (दिनांक आणि वेळ)": "VALUE_HERE"
        }
    },
    "4": {
        "Type of Information (माहितीचा प्रकार)": "VALUE_HERE"
    },
    "5": {
        "Place of Occurrence (घटनास्थळ)": {
            "(a) Direction and distance from P.S. (पोलिस ठाण्या पासून दिशा आणि अंतर)": "VALUE_HERE",
            "(b) Address (पत्ता)": "VALUE_HERE",
            "(c) In case, outside the limit of this Police Station, then Name of P.S. (पोलीस ठाण्याच्या हद्दी बाहेर असल्यास, पोलीस ठाण्याचे नाव)": "VALUE_HERE",
            "District (State) (जिल्हा (राज्य))": "VALUE_HERE"
        }
    },
    "6": {
        "Complainant / Informant (तक्रारदार / माहिती देणारा)": {
            "(a) Name (नाव)": "VALUE_HERE",
            "(b) Father's/Husband's Name (वडिलांचे/पतीचे नाव)": "VALUE_HERE",
            "(c) Date/Year of Birth (जन्मतारीख / वर्ष)": "VALUE_HERE",
            "(d) Nationality (राष्ट्र्रीयता)": "VALUE_HERE",
            "(e) UID No. (यु.आय.डी. क्र.)": "VALUE_HERE",
            "(f) Passport No. (पारपत्र क्र.)": "VALUE_HERE",
            "(g) ID Details (Ration Card, Voter ID Card, Passport, UID No., Driving License, PAN)": [
                {
                    "S. No.": "VALUE_HERE",
                    "ID Type (ओळखपत्राचा प्रकार)": "VALUE_HERE",
                    "ID Number (ओळखपत्र क्रमांक)": "VALUE_HERE"
                }
            ],
            "(h) Occupation (व्यवसाय)": "VALUE_HERE",
            "(i) Address (पत्ता)": [
                {
                    "S. No.": "VALUE_HERE",
                    "Address Type (पत्ता प्रकार)": "VALUE_HERE",
                    "Address": "VALUE_HERE"
                }
            ],
            "(j) Phone number (फोन नं.)": "VALUE_HERE"
        }
    },
    "7": {
        "Details of known / suspected / unknown accused with full particulars (ज्ञात / संशयित / अज्ञात आरोर्पींचे संपूर्ण तपशील)": {
            "Accused More Than (अज्ञात आरोपी एका पेक्षा जास्त असतील तर संख्या)": "VALUE_HERE",
            "Accused List": [
                {
                    "S. No. (अ.क्र.)": "VALUE_HERE",
                    "Name (नाव)": "VALUE_HERE",
                    "Alias (उर्फनाव)": "VALUE_HERE",
                    "Relative's Name (नातेवाईकाचे नाव)": "VALUE_HERE",
                    "Present Address (वर्तमान पत्ता)": "VALUE_HERE"
                }
            ]
        }
    },
    "8": {
        "Reasons for delay in reporting by the complainant / informant (तक्रारदार/माहिती देणा-याकडून तक्रार करण्यातील विलंबाची कारणे)": "VALUE_HERE"
    },
    "9": {
        "Particulars of properties of interest (संबंधीत मालमत्तेचा तपशील)": [
            {
                "S.No. (अ.क्र.)": "N/A",
                "Property Category (मालमत्ता वर्ग)": "N/A",
                "Property Type (मालमत्ता प्रकार)": "N/A",
                "Description (विवरण)": "N/A",
                "Value (In Rs/-) (मुल्य (रु. मध्ये))": "N/A"
            }
        ]
    },
    "10": {
        "Total value of property (In Rs/-) (मालमत्तेचे एकूण मुल्य (रु. मध्ये))": "N/A"
    },
    "11": {
        "Inquest Report / U.D. case No., if any (मरणान्वेषण अहवाल/अकस्मात मृत्यू प्रकरण क्र. जर असल्यास)": {
            "S. No. (अ.क्र.)": "N/A",
            "UIDB Number (यु.आय.डी.बी.)": "N/A"
        }
    },
    "12": {
        "First Information contents (प्रथम खबर हकिगत)": "N/A"
    },
    "13": {
        "Action taken Since the above information reveals commission of offence(s) u/s as mentioned at Item No.2(केलेली कारवाईः बाब क्र.२ मध्ये नमूद केलेल्या कलमान्वये वरील अहवालावरून अपराध दिसून आल्यामुळे)": [
            {
                "Registered the case and took up the investigation (प्रकरण नोंदविले आणि तपासाचे काम हाती घेतले) or (किंवा) ": "N/A",
                "Directed (Name of I.O.) (तपास अधिका-याचे नाव)": "N/A",
                "Rank (हुद्दा)": "N/A",
                "No. (क्र.)": "N/A",
                "Refused investigation due to (ज्या कारणामुळे तपास करण्यास नकार दिला) or(किंवा)":"N/A",
                "Transferred to P.S. (गुन्हा दुसरीकडे पाठविला असल्यास त्या पोलीस ठाण्याचे नाव)": "N/A",
                "District (जिल्हा)": "N/A"
            }
        ]
    },
    "14": {
        "Signature / Thumb impression of the complainant / informant (तक्रारदाराची/खबर देणा-याची सही/अंगठा)": "N/A",
        "Name (नाव)": "N/A",
        "Rank (हुद्दा)": "N/A",
        "No. (क्र.)": "N/A"
    },
    "15": {
        "Date and time of dispatch to the court (न्यायालयात पाठवल्याची तारीख व वेळ)": "N/A",
        "Physical features, deformities and other details of the suspect/accused: ( If known / seen ) (संशयीत/आरोपीचे (माहित असलेल या/पाहिलेल या) शारीरिक वैशिष्टये, स यंग आणि इतर तपशील": [
            {
                "S.No. (अ.क्र.)": "N/A",
                "Sex(लिंग)": "N/A",
                "Date/Year Of Birth(जन्म तारीख वर्ष )": "N/A",
                "Build(बांधा)": "N/A",
                "Height (cms) (उंची(से .मी)": "N/A",
                "Complexion (रंग)": "N/A",
                "Identification Mark(s) (ओळखीच या खुणा)": "N/A",
                "Deformities/Peculiarities (व्यंग वैशिष्ट्ये )": "N/A",
                "Teeth(दात)": "N/A",
                "Hair(केस)": "N/A",
                "Eye(डोळे)": "N/A",
                "Habit(s)(सवय)": "N/A",
                "Dress Habit (s)(पोशाख या सवयी )": "N/A",
                "Language/Dia(भाषा / बोली )": "N/A",
                "Place of(चे ठिकाण )": [
                    {
                        "Burn Marks(भाजल्याच्या खुणा )": "N/A",
                        "Leucoderm(कोड)": "N/A",
                        "Mole(तीळ )": "N/A",
                        "Scar(वन्र )": "N/A",
                        "Tattoo(गोदन )": "N/A"
                    }
                ],
                "Others(इतर)": "N/A"
            }
        ]
    }
    
    
}
"""

    prompt = (
        "Convert the following extracted PDF text into the given structured JSON format.\n"
        "Ensure that:\n"
        "1. The JSON format strictly follows the fixed structure.\n"
        "2. Every key must be exactly as in the format.\n"
        "3. If any value is missing, replace it with 'N/A'.\n"
        "4. Do not generate any extra text, explanations, or markdown formatting.\n"
        "5. Ensure the JSON output is syntactically correct.\n"
        "6. Keep all Marathi characters in the original form without any corruption.\n\n"
        "### Fixed JSON Format:\n"
        "```json\n" + fixed_json_structure + "\n```\n"
        "### Extracted Text:\n"
        "```\n" + text + "\n```\n"
        "Return only valid JSON."
    )


    client = openai.OpenAI(api_key=OPENAI_API_KEY)

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are an AI that converts text into structured JSON.",
            },
            {"role": "user", "content": prompt},
        ],
    )

    structured_data = response.choices[0].message.content.strip()

    # Ensure valid JSON
    try:
        return json.loads(structured_data)  # Convert response to JSON
    except json.JSONDecodeError:
        print("⚠️ OpenAI returned an invalid JSON format. Attempting to fix...")
        structured_data = (
            structured_data.replace("```json", "").replace("```", "").strip()
        )
        try:
            return json.loads(structured_data)
        except json.JSONDecodeError:
            return {"error": "Invalid JSON format returned by AI"}


# def main():
#     try:
#         # Read PDF file from stdin (Node.js sends buffer)
#         pdf_buffer = sys.stdin.buffer.read()

#         if not pdf_buffer:
#             print(json.dumps({"error": "No PDF file received"}))
#             sys.exit(1)

#         # Save buffer to a temporary PDF file
#         with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_pdf:
#             temp_pdf.write(pdf_buffer)
#             temp_pdf_path = temp_pdf.name

#         # Extract text from the PDF
#         extracted_text = extract_text_from_pdf(temp_pdf_path)

#         # Return extracted text as JSON
#         print(json.dumps({"text": extracted_text}, ensure_ascii=False))

#     except Exception as e:
#         print(json.dumps({"error": str(e)}))  # Proper error message as JSON
def main():
    try:
        # Read bytes from stdin
        pdf_bytes = sys.stdin.buffer.read()
        extracted_text = extract_text_from_pdf(pdf_bytes)
        structured_output = convert_text_to_json(extracted_text)

        print(json.dumps(structured_output, indent=4, ensure_ascii=False))
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()

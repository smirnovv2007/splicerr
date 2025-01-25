import argparse

def create_wordlist(input_file, output_file):
    # Set to store unique words
    unique_words = set()
    
    try:
        # Read input file and process words
        with open(input_file, 'r', encoding='utf-8') as f:
            for line in f:
                # Split line into words and remove punctuation
                words = line.strip().split()
                # Add cleaned words to set
                for word in words:
                    # Remove special characters and digits
                    if not word.isnumeric():
                        unique_words.add(word)
        
        # Write unique words to output file
        with open(output_file, 'w', encoding='utf-8') as f:
            for word in sorted(unique_words):
                f.write(word + '\n')
                
        print(f"Wordlist created successfully: {output_file}")
        print(f"Total unique words: {len(unique_words)}")
        
    except FileNotFoundError:
        print(f"Error: Input file '{input_file}' not found")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Create a wordlist from input file')
    parser.add_argument('input_file', help='Path to input file')
    parser.add_argument('output_file', help='Path to output file')
    
    args = parser.parse_args()
    create_wordlist(args.input_file, args.output_file)
FROM ollama/ollama:latest
ARG OLLAMA_MODEL=llama3.1:8b-instruct
ENV OLLAMA_KEEP_ALIVE=24h
RUN ollama serve & sleep 5 && ollama pull $OLLAMA_MODEL && pkill ollama || true
EXPOSE 11434
